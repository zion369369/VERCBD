"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Undo, 
  Redo, 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify, 
  List, 
  ListOrdered, 
  Indent, 
  Outdent, 
  Link as LinkIcon, 
  Unlink, 
  Minus, 
  Eraser, 
  ChevronDown, 
  Highlighter 
} from "lucide-react";

interface RichTextEditorProps {
  label?: string;
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  helperText?: string;
  minHeight?: string;
  className?: string;
}

const TEXT_COLORS = [
  { name: "Default (Dark)", value: "#1e293b" },
  { name: "VERC Blue", value: "#004B8D" },
  { name: "Teal Green", value: "#0d9488" },
  { name: "Emerald", value: "#10b981" },
  { name: "Amber", value: "#d97706" },
  { name: "Crimson", value: "#dc2626" },
  { name: "Indigo", value: "#4f46e5" },
  { name: "Muted Gray", value: "#64748b" }
];

const HIGHLIGHT_COLORS = [
  { name: "None", value: "transparent" },
  { name: "Yellow Tint", value: "#fef08a" },
  { name: "Green Tint", value: "#bbf7d0" },
  { name: "Cyan Tint", value: "#bae6fd" },
  { name: "Pink Tint", value: "#fbcfe8" },
  { name: "Orange Tint", value: "#fed7aa" },
  { name: "Light Slate", value: "#e2e8f0" }
];

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  label = "Description",
  value,
  onChange,
  placeholder = "What makes this product great? Use the toolbar for headings, bullets, colours and line spacing.",
  helperText,
  minHeight = "220px",
  className = ""
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [htmlContent, setHtmlContent] = useState(value || "");
  const [selectedTextColor, setSelectedTextColor] = useState("#004B8D");
  const [showColorMenu, setShowColorMenu] = useState(false);
  const [showHighlightMenu, setShowHighlightMenu] = useState(false);
  const [showStyleMenu, setShowStyleMenu] = useState(false);
  const [showSizeMenu, setShowSizeMenu] = useState(false);
  const [showLineSpacingMenu, setShowLineSpacingMenu] = useState(false);
  const [lineSpacing, setLineSpacing] = useState("1.6");

  // Keep internal content synchronized when value updates externally
  useEffect(() => {
    if (editorRef.current && !isHtmlMode) {
      if (editorRef.current.innerHTML !== (value || "")) {
        editorRef.current.innerHTML = value || "";
      }
    }
    setHtmlContent(value || "");
  }, [value, isHtmlMode]);

  const exec = (command: string, val: string | undefined = undefined) => {
    if (isHtmlMode) return;
    document.execCommand(command, false, val);
    if (editorRef.current) {
      const updated = editorRef.current.innerHTML;
      setHtmlContent(updated);
      onChange(updated);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      const updated = editorRef.current.innerHTML;
      setHtmlContent(updated);
      onChange(updated);
    }
  };

  const handleFormatBlock = (tag: string) => {
    exec("formatBlock", `<${tag}>`);
    setShowStyleMenu(false);
  };

  const handleFontSize = (size: string) => {
    exec("fontSize", size);
    setShowSizeMenu(false);
  };

  const handleTextColor = (color: string) => {
    setSelectedTextColor(color);
    exec("foreColor", color);
    setShowColorMenu(false);
  };

  const handleHighlightColor = (color: string) => {
    exec("hiliteColor", color);
    setShowHighlightMenu(false);
  };

  const handleLink = () => {
    const url = prompt("Enter the destination link (e.g. https://www.vercbd.org):");
    if (url) {
      exec("createLink", url);
    }
  };

  const handleLineSpacing = (spacing: string) => {
    setLineSpacing(spacing);
    if (editorRef.current) {
      editorRef.current.style.lineHeight = spacing;
      handleInput();
    }
    setShowLineSpacingMenu(false);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
            {label}
          </label>
          <span className="text-[10px] font-semibold text-gray-400">
            {isHtmlMode ? "HTML Source Mode" : "Word WYSIWYG Mode"}
          </span>
        </div>
      )}

      {/* Main Rounded Word-Style Card Container */}
      <div className="border border-gray-200 dark:border-white/10 rounded-2xl bg-white dark:bg-[#181824] shadow-xs overflow-hidden transition-all focus-within:ring-2 focus-within:ring-brand-primary/20 focus-within:border-brand-primary">
        
        {/* Full Toolbar */}
        <div className="bg-gray-50/80 dark:bg-white/5 border-b border-gray-200 dark:border-white/10 p-2 select-none">
          
          {/* Row 1: Actions, Formatting, Colors & Alignment */}
          <div className="flex flex-wrap items-center gap-1 pb-1.5 border-b border-gray-200/60 dark:border-white/5">
            {/* Undo / Redo */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => exec("undo")}
                className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-colors"
                title="Undo (Ctrl+Z)"
              >
                <Undo size={14} />
              </button>
              <button
                type="button"
                onClick={() => exec("redo")}
                className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-colors"
                title="Redo (Ctrl+Y)"
              >
                <Redo size={14} />
              </button>
            </div>

            <div className="w-px h-5 bg-gray-300 dark:bg-white/10 mx-1" />

            {/* Style Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowStyleMenu(!showStyleMenu)}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-50"
              >
                <span>Style</span>
                <ChevronDown size={12} className="text-gray-400" />
              </button>

              {showStyleMenu && (
                <div className="absolute left-0 top-full mt-1 w-44 bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-xl shadow-xl z-50 py-1">
                  <button
                    type="button"
                    onClick={() => handleFormatBlock("p")}
                    className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300"
                  >
                    Paragraph (Normal)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFormatBlock("h1")}
                    className="w-full text-left px-3 py-1.5 text-base font-extrabold hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white"
                  >
                    Heading 1
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFormatBlock("h2")}
                    className="w-full text-left px-3 py-1.5 text-sm font-bold hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white"
                  >
                    Heading 2
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFormatBlock("h3")}
                    className="w-full text-left px-3 py-1.5 text-xs font-bold hover:bg-gray-100 dark:hover:bg-white/10 text-gray-800 dark:text-gray-200"
                  >
                    Heading 3
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFormatBlock("blockquote")}
                    className="w-full text-left px-3 py-1.5 text-xs italic hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400"
                  >
                    Blockquote
                  </button>
                </div>
              )}
            </div>

            {/* Size Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowSizeMenu(!showSizeMenu)}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-50"
              >
                <span>Size</span>
                <ChevronDown size={12} className="text-gray-400" />
              </button>

              {showSizeMenu && (
                <div className="absolute left-0 top-full mt-1 w-32 bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-xl shadow-xl z-50 py-1">
                  <button
                    type="button"
                    onClick={() => handleFontSize("2")}
                    className="w-full text-left px-3 py-1 text-xs hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300"
                  >
                    Small (12px)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFontSize("3")}
                    className="w-full text-left px-3 py-1 text-xs font-medium hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300"
                  >
                    Normal (14px)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFontSize("4")}
                    className="w-full text-left px-3 py-1 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300"
                  >
                    Medium (16px)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFontSize("5")}
                    className="w-full text-left px-3 py-1 text-base font-bold hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300"
                  >
                    Large (18px)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFontSize("6")}
                    className="w-full text-left px-3 py-1 text-lg font-extrabold hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300"
                  >
                    Huge (24px)
                  </button>
                </div>
              )}
            </div>

            <div className="w-px h-5 bg-gray-300 dark:bg-white/10 mx-1" />

            {/* Basic Styles */}
            <button
              type="button"
              onClick={() => exec("bold")}
              className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 transition-colors font-black"
              title="Bold (Ctrl+B)"
            >
              <Bold size={14} />
            </button>
            <button
              type="button"
              onClick={() => exec("italic")}
              className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 transition-colors italic"
              title="Italic (Ctrl+I)"
            >
              <Italic size={14} />
            </button>
            <button
              type="button"
              onClick={() => exec("underline")}
              className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 transition-colors underline"
              title="Underline (Ctrl+U)"
            >
              <Underline size={14} />
            </button>
            <button
              type="button"
              onClick={() => exec("strikeThrough")}
              className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 transition-colors"
              title="Strikethrough"
            >
              <Strikethrough size={14} />
            </button>

            <div className="w-px h-5 bg-gray-300 dark:bg-white/10 mx-1" />

            {/* Text Color Picker */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowColorMenu(!showColorMenu)}
                className="flex items-center gap-1 p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 transition-colors"
                title="Text Color"
              >
                <div className="flex flex-col items-center">
                  <span className="font-black text-xs leading-none">A</span>
                  <span 
                    className="w-3.5 h-1 rounded-full mt-0.5" 
                    style={{ backgroundColor: selectedTextColor }}
                  />
                </div>
                <ChevronDown size={10} className="text-gray-400" />
              </button>

              {showColorMenu && (
                <div className="absolute left-0 top-full mt-1 w-44 bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-xl shadow-xl z-50 p-2">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Text Color</div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {TEXT_COLORS.map((c) => (
                      <button
                        key={c.value}
                        type="button"
                        onClick={() => handleTextColor(c.value)}
                        className="w-7 h-7 rounded-lg border border-gray-200 dark:border-white/20 flex items-center justify-center transition-transform hover:scale-110 shadow-xs"
                        style={{ backgroundColor: c.value }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Highlight Background Picker */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowHighlightMenu(!showHighlightMenu)}
                className="flex items-center gap-1 p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 transition-colors"
                title="Highlight Color"
              >
                <Highlighter size={14} />
                <ChevronDown size={10} className="text-gray-400" />
              </button>

              {showHighlightMenu && (
                <div className="absolute left-0 top-full mt-1 w-44 bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-xl shadow-xl z-50 p-2">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Highlight</div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {HIGHLIGHT_COLORS.map((c) => (
                      <button
                        key={c.value}
                        type="button"
                        onClick={() => handleHighlightColor(c.value)}
                        className="w-7 h-7 rounded-lg border border-gray-300 dark:border-white/20 flex items-center justify-center transition-transform hover:scale-110 shadow-xs"
                        style={{ backgroundColor: c.value === "transparent" ? "#ffffff" : c.value }}
                        title={c.name}
                      >
                        {c.value === "transparent" && <span className="text-[9px] text-gray-500 font-bold">None</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="w-px h-5 bg-gray-300 dark:bg-white/10 mx-1" />

            {/* Alignments */}
            <button
              type="button"
              onClick={() => exec("justifyLeft")}
              className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 transition-colors"
              title="Align Left"
            >
              <AlignLeft size={14} />
            </button>
            <button
              type="button"
              onClick={() => exec("justifyCenter")}
              className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 transition-colors"
              title="Align Center"
            >
              <AlignCenter size={14} />
            </button>
            <button
              type="button"
              onClick={() => exec("justifyRight")}
              className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 transition-colors"
              title="Align Right"
            >
              <AlignRight size={14} />
            </button>
            <button
              type="button"
              onClick={() => exec("justifyFull")}
              className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 transition-colors"
              title="Justify"
            >
              <AlignJustify size={14} />
            </button>

            <button
              type="button"
              onClick={() => exec("insertUnorderedList")}
              className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 transition-colors"
              title="Bulleted List"
            >
              <List size={14} />
            </button>
          </div>

          {/* Row 2: Lists, Spacing, Links, Rules & HTML Toggle */}
          <div className="flex flex-wrap items-center gap-1 pt-1.5">
            <button
              type="button"
              onClick={() => exec("insertOrderedList")}
              className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 transition-colors"
              title="Numbered List"
            >
              <ListOrdered size={14} />
            </button>
            <button
              type="button"
              onClick={() => exec("outdent")}
              className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 transition-colors"
              title="Decrease Indent"
            >
              <Outdent size={14} />
            </button>
            <button
              type="button"
              onClick={() => exec("indent")}
              className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 transition-colors"
              title="Increase Indent"
            >
              <Indent size={14} />
            </button>

            <div className="w-px h-5 bg-gray-300 dark:bg-white/10 mx-1" />

            {/* Line Spacing Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowLineSpacingMenu(!showLineSpacingMenu)}
                className="flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-lg bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-50"
              >
                <span>↕ Line spacing</span>
                <ChevronDown size={12} className="text-gray-400" />
              </button>

              {showLineSpacingMenu && (
                <div className="absolute left-0 top-full mt-1 w-36 bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-xl shadow-xl z-50 py-1">
                  <button
                    type="button"
                    onClick={() => handleLineSpacing("1.2")}
                    className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300"
                  >
                    Tight (1.2)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLineSpacing("1.6")}
                    className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300"
                  >
                    Normal (1.6)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLineSpacing("2.0")}
                    className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300"
                  >
                    Double (2.0)
                  </button>
                </div>
              )}
            </div>

            <div className="w-px h-5 bg-gray-300 dark:bg-white/10 mx-1" />

            {/* Link & Unlink */}
            <button
              type="button"
              onClick={handleLink}
              className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 transition-colors"
              title="Insert Link"
            >
              <LinkIcon size={14} />
            </button>
            <button
              type="button"
              onClick={() => exec("unlink")}
              className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 transition-colors"
              title="Remove Link"
            >
              <Unlink size={14} />
            </button>

            {/* Horizontal Rule */}
            <button
              type="button"
              onClick={() => exec("insertHorizontalRule")}
              className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 transition-colors"
              title="Horizontal Divider Line"
            >
              <Minus size={14} />
            </button>

            {/* Clear Formatting */}
            <button
              type="button"
              onClick={() => exec("removeFormat")}
              className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 transition-colors"
              title="Clear Formatting (Eraser)"
            >
              <Eraser size={14} />
            </button>

            <div className="w-px h-5 bg-gray-300 dark:bg-white/10 mx-1" />

            {/* HTML Toggle Button */}
            <button
              type="button"
              onClick={() => {
                if (isHtmlMode) {
                  if (editorRef.current) {
                    editorRef.current.innerHTML = htmlContent;
                  }
                  onChange(htmlContent);
                }
                setIsHtmlMode(!isHtmlMode);
              }}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all ${
                isHtmlMode
                  ? "bg-brand-primary text-white border-brand-primary"
                  : "bg-white dark:bg-white/10 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-50"
              }`}
              title="Toggle HTML Source Code View"
            >
              HTML
            </button>
          </div>
        </div>

        {/* Editable Area */}
        <div className="p-4 relative">
          {isHtmlMode ? (
            <textarea
              value={htmlContent}
              onChange={(e) => {
                setHtmlContent(e.target.value);
                onChange(e.target.value);
              }}
              className="w-full font-mono text-xs p-3 bg-gray-950 text-emerald-400 rounded-xl border border-gray-800 outline-hidden focus:ring-1 focus:ring-emerald-500 custom-scrollbar"
              style={{ minHeight }}
              placeholder="<!-- Write or inspect raw HTML content here -->"
            />
          ) : (
            <div
              ref={editorRef}
              contentEditable
              onInput={handleInput}
              onBlur={handleInput}
              className="outline-hidden text-sm text-gray-900 dark:text-gray-100 font-sans leading-relaxed focus:outline-hidden prose dark:prose-invert max-w-none custom-editor-content"
              style={{ 
                minHeight,
                lineHeight: lineSpacing
              }}
              data-placeholder={placeholder}
            />
          )}
        </div>
      </div>

      {/* Helper text matching Word-like explanation */}
      <div className="text-[11px] text-gray-400 font-medium leading-relaxed px-1">
        {helperText || "Formats like a Word document — headings, lists, colours, alignment and line spacing all carry through to the product page exactly as you see them here."}
      </div>

      <style jsx global>{`
        .custom-editor-content:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
          display: block;
        }
        .custom-editor-content h1 {
          font-size: 1.75rem;
          font-weight: 800;
          margin-top: 0.75rem;
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }
        .custom-editor-content h2 {
          font-size: 1.35rem;
          font-weight: 700;
          margin-top: 0.75rem;
          margin-bottom: 0.5rem;
          line-height: 1.25;
        }
        .custom-editor-content h3 {
          font-size: 1.15rem;
          font-weight: 700;
          margin-top: 0.5rem;
          margin-bottom: 0.25rem;
        }
        .custom-editor-content ul {
          list-style-type: disc;
          margin-left: 1.5rem;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .custom-editor-content ol {
          list-style-type: decimal;
          margin-left: 1.5rem;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .custom-editor-content blockquote {
          border-left: 3px solid #004B8D;
          padding-left: 0.75rem;
          margin: 0.75rem 0;
          font-style: italic;
          color: #64748b;
        }
        .custom-editor-content a {
          color: #004B8D;
          text-decoration: underline;
        }
        .custom-editor-content hr {
          border: 0;
          border-top: 1px solid #e2e8f0;
          margin: 1rem 0;
        }
      `}</style>
    </div>
  );
};
