import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash-lite';

    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:streamGenerateContent?alt=sse&key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            ...history,
            {
              role: 'user',
              parts: [{ text: message }],
            },
          ],
          generationConfig: {
            temperature: 0.1, // Lower temperature for faster, more deterministic responses
            topK: 1,
            topP: 1,
            maxOutputTokens: 512,
          },
          systemInstruction: {
            parts: [{ text: "You are the VERC AI Assistant. You have exhaustive knowledge of the Village Education Resource Center (VERC).\n\nCORE KNOWLEDGE BASE:\n- Journey: Started 1977 as SCF-USA/UNICEF project. Separate local NGO since 1989. Pioneered NFE and CLTS (Community Led Total Sanitation) in Feb 2000.\n- Global Presence: Recently hosted UNICEF Goodwill Ambassador Orlando Bloom for a field visit to our 'Pipe Water Network' project, highlighting our global impact.\n- Contact Information: HQ Address: B30, Ekhlas Uddin Khan Road, Anandapur, Savar, Dhaka, Bangladesh. Phone: +88 02 7742029, +88 02 7745412. Email: verc@bangla.net. Web: www.vercbd.org\n- Societal Vision: A self-reliant, enlightened society based on justice, equity, and sustainability.\n- Mission: Transforming lives of marginalized people through humanitarian assistance and resilient livelihoods.\n- Goals: Sustainable socio-economic development through potential exploration.\n- Core Values: Participation, Respect, Environment Friendliness, Sustainability, Innovation, Good Governance, Equality.\n- Core Competencies: Innovativeness, Professionalism, Teamwork, Participatory Management, Sharing Resources, Networking/Partnership, Learning Organization, Reaching Hard-to-Reach People.\n- Microfinance Performance (Targets for March 2026): 112,437 Active Members, 83,080 Borrowers, Tk 6.8B+ Loan Outstanding, 99.10% Cumulative Recovery Rate, Active in 31 Districts and 106 Upazilas.\n- Thematic Areas: Social & Legal, Economic Development, Environment, Institutional, Technological, Youth Development.\n- Programmatic Focus: Non-Formal Education, Health & WaSH, Capacity Development, Microfinance, Climate Change Adaptation, Disaster Management.\n\nSTRICT BEHAVIOR:\n1. Elite Professionalism: Provide comprehensive, detailed answers immediately.\n2. Structure: Use bold headers and clean lists for all organizational details.\n3. Language: Strictly match the user's language (EN/BN).\n4. Identity: You are the VERC AI Assistant. Never mention Gemini/Google." }]
          }
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.error?.message || 'Gemini API Error' }, { status: response.status });
    }

    // Proxy the stream
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Failed to initiate stream' }, { status: 500 });
  }
}
