const fs = require('fs'), path = require('path'), ts = require('typescript');
const root = path.resolve(__dirname, '..');
const routes = {
  '/': 'VERC overview and impact', '/about': 'About VERC, history, vision, mission and values',
  '/about/board': 'Board of Directors', '/about/staff': 'Senior staff and leadership', '/about/organogram': 'Organizational structure',
  '/about/legal': 'Legal registration and governance', '/about/annual-report': 'Annual reports', '/about/awards': 'Awards and recognition',
  '/programs': 'Social programs', '/programs/education': 'Life skill and non-formal education', '/programs/wash': 'Health, hospitals, water, sanitation and CLTS',
  '/programs/livelihood': 'Livelihood and empowerment', '/programs/capacity': 'Capacity building and training',
  '/microfinance': 'Microfinance', '/microfinance/products': 'Microfinance products and savings', '/impact': 'Community impact and success stories',
  '/partners': 'Partners and collaborations', '/contact': 'Contact and office finder', '/resources/branches': 'Branch network',
  '/resources/gallery': 'Photo gallery', '/careers': 'Careers and BDJobs recruitment', '/donate': 'Donations and campaigns'
};
const clean = text => text.replace(/<[^>]*>/g, ' ').replace(/&nbsp;|&#160;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const propertyNames = new Set(['title','subtitle','label','desc','description','text','content','heading','summary','answer','name','stats','focus','achievement','year']);
const pages = [];
for (const [url,title] of Object.entries(routes)) {
  const file = path.join(root, 'app', url === '/' ? '' : url.slice(1), 'page.tsx');
  if (!fs.existsSync(file)) continue;
  const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const lines = [];
  function visit(node) {
    if (ts.isJsxText(node)) { const value = clean(node.text); if (value.length > 8 && /[a-z\u0980-\u09ff]/i.test(value)) lines.push(value); }
    if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) && ts.isPropertyAssignment(node.parent) && propertyNames.has(node.parent.name.getText(source).replace(/['"]/g,''))) {
      const value = clean(node.text); if (value.length > 8 && !/^https?:|^\//.test(value)) lines.push(value);
    }
    ts.forEachChild(node,visit);
  }
  visit(source);
  pages.push({ id: 'page:'+url, title, url, text: [...new Set(lines)].join('\n') });
}
// Only public fields are indexed. No users, inquiries, CVs, donors, subscribers,
// draft vacancies, microfinance eligibility or internal application processes.
const allow = {
  defaultSiteSettings: ['siteTitle','tagline','email','supportEmail','phone','hotline','address'],
  defaultAboutContent: ['vision','mission','visionText','missionText','coreValues','boardMembers'],
  defaultPrograms: ['id','title','description','category','slug','features','reach','status'],
  defaultMicrofinanceProducts: ['id','title','category','description','features','loanLimit','tenure'],
  defaultTeamMembers: ['id','name','role','department','bio','order'],
  defaultPartners: ['id','name','category','description','websiteUrl'],
  defaultLegalCertifications: ['id','title','authority','regNo','desc','status','link'],
  defaultAnnualReports: ['id','year','title','desc','link'], defaultAwards: ['id','title','organization','year','desc','category'],
  defaultOrganogramNodes: ['id','title','subtitle','category','department'], defaultImpactStats: ['label','value','suffix'],
  defaultCampaigns: ['id','title','thematicArea','targetAmount','raisedAmount','status','deadline','location'],
};
const defaults = {};
const contextFile = path.join(root,'context/ContentContext.tsx');
const context = ts.createSourceFile(contextFile,fs.readFileSync(contextFile,'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
function literal(node) {
  if (!node) return undefined;
  if (ts.isStringLiteral(node)||ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind===ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind===ts.SyntaxKind.FalseKeyword) return false;
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(literal).filter(value=>value!==undefined);
  if (ts.isObjectLiteralExpression(node)) return Object.fromEntries(node.properties.filter(ts.isPropertyAssignment).map(property=>[property.name.getText().replace(/['"]/g,''),literal(property.initializer)]).filter(([,value])=>value!==undefined));
  return undefined;
}
function visitDefault(node) {
  if (ts.isVariableDeclaration(node) && allow[node.name.getText(context)]) {
    const name=node.name.getText(context),value=literal(node.initializer),fields=allow[name];
    const pick=entry=>Object.fromEntries(Object.entries(entry||{}).filter(([key])=>fields.includes(key)));
    defaults[name.replace(/^default/,'').replace(/^./,letter=>letter.toLowerCase())]=Array.isArray(value)?value.map(pick):pick(value);
  }
  ts.forEachChild(node,visitDefault);
}
visitDefault(context);
for (const [relative,variable,base] of [['app/solutions/[slug]/page.tsx','programs','/solutions'],['app/impact/[slug]/page.tsx','stories','/impact']]) {
  const file=path.join(root,relative),source=ts.createSourceFile(file,fs.readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
  function visitRecords(node) {
    if(ts.isVariableDeclaration(node)&&node.name.getText(source)===variable){const records=literal(node.initializer)||{};for(const [slug,item]of Object.entries(records)){const url=base+'/'+slug;pages.push({id:'page:'+url,title:item.title,url,text:[item.description,item.content,...(item.features||[]),item.location,item.date].filter(Boolean).map(clean).join('\n')});}}
    ts.forEachChild(node,visitRecords);
  }
  visitRecords(source);
}
fs.mkdirSync(path.join(root,'lib/data'),{recursive:true});
fs.writeFileSync(path.join(root,'lib/data/site-knowledge.json'),JSON.stringify({ pages, defaults },null,2)+'\n');
console.log(`Indexed ${pages.length} public website pages and ${Object.keys(defaults).length} public default collections.`);
