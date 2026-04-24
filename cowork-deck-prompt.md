# Prompt for Claude Cowork — Executive Presentation Deck

---

Please create a professional PowerPoint presentation deck with the following specifications.

---

## CONTEXT AND PURPOSE

**Event:** 45-minute talk within a 2-3 day executive leadership training on AI, delivered by an internal leader to the senior leadership team of a $4 billion company.

**Speaker's role:** Internal technology leader who built a proof-of-concept application live using AI coding tools, and is using that experience as the basis for the talk.

**Audience:** C-suite and senior executives with high business acumen. They have expressed interest in understanding AI-assisted development well enough to try it themselves ("vibe coding"). They are not software engineers, but they are intelligent and motivated learners. Avoid deep technical jargon; when technical terms are used, briefly define them.

**Talk title:** *From Idea to Working App: A Live Walk-Through of AI-Assisted Development*

**Core message:** AI coding tools have fundamentally changed how fast a person with domain knowledge but limited coding experience can turn a business idea into working software — but the quality of the human input still determines the quality of the result. The human-AI collaboration before and during coding is where the real value is created.

**Tone:** Energetic, honest, story-driven. Not a sales pitch for AI — a candid walk-through of how it actually went, including the bumps.

---

## SLIDE STRUCTURE AND CONTENT

### SLIDE 1 — Title Slide
**Title:** From Idea to Working App
**Subtitle:** A Walk-Through of AI-Assisted Development
**Speaker name and title:** [Speaker to fill in]
**Visual suggestion:** A clean, modern split image: left side shows a person at a laptop typing a natural-language description; right side shows a polished web application UI. Subtle AI circuit/glow aesthetic, but not overdone.

---

### SLIDE 2 — Setting the Stage
**Heading:** Two Ways to Work With AI on Software

**Content (two-column layout):**

Left column — **"Vibe Coding"**
- Conversational, exploratory
- Rapid prototyping and proof-of-concept
- Domain expert + AI as coding partner
- Goal: working software fast, learn as you go
- Best for: internal tools, demos, personal projects, experiments

Right column — **"Enterprise AI-Assisted Development"**
- Structured, governed, reviewed
- Follows architecture standards, security policies, testing requirements
- AI as accelerator within an engineering team
- Goal: production-grade, maintainable, compliant software
- Best for: customer-facing systems, regulated domains, mission-critical applications

**Bottom callout box:** *Today's walk-through is firmly in the "vibe coding" category — and that's intentional. Understanding this mode of working is the first step to knowing when and how to use it.*

**Speaker notes:** Spend about 2 minutes on this slide. The distinction matters because executives sometimes assume that whatever an AI generates is production-ready. Set the right frame: vibe coding is powerful for exploration and fast prototyping, but enterprise software requires engineering rigor on top of it. The tools are the same; the process around them is different. This talk focuses on vibe coding because that's what this audience can pick up and try themselves.

---

### SLIDE 3 — The Business Need
**Heading:** It Started With a Real Problem

**Content:**
Our organization works with complex veterinary diagnostic documents — multi-page PDFs describing laboratory tests, clinical applications, and product details. A team member wanted to explore whether an AI could read one of these documents and produce a marketing-ready summary automatically.

**The vision — 3 bullet points:**
- Upload a PDF document to a web application
- Ask an AI model to analyze it and generate a structured marketing summary
- Continue the conversation to refine or ask follow-up questions

**Callout:** *No engineering team. No project ticket. No sprint planning. Just a business idea and an AI coding tool.*

**Speaker notes:** This is a real use case. The veterinary diagnostics framing is specific to our domain, but the pattern is universal: someone has a document, they want AI to do something useful with it, and they want a simple UI to do it through. Keep this slide brief — it's scene-setting, not the main act.

---

### SLIDE 4 — The Tool
**Heading:** Meet Claude Code

**Content:**
Claude Code is an AI coding assistant built by Anthropic. It runs in a terminal window alongside your code editor. You describe what you want — in plain English — and it writes, edits, and debugs code in response.

**Key characteristics (icon list):**
- Reads and understands your entire codebase as context
- Writes code across multiple files simultaneously
- Asks clarifying questions before making assumptions
- Explains its decisions and trade-offs
- Can run commands, install packages, and check results

**Visual suggestion:** A simulated screenshot of a Claude Code terminal session — showing a user typing a natural-language request and Claude Code responding with code. (Placeholder: insert actual Claude Code screenshot here.)

**Speaker notes:** You don't need to dwell here — most of this audience will encounter Claude Code for the first time today. The key point is that it's conversational. You're not writing code; you're describing what you want. Claude writes the code. You review, test, and guide. The analogy that works well: it's like having a very fast, very knowledgeable junior developer who does exactly what you tell them to — which means the quality of your instructions matters enormously.

---

### SLIDE 5 — The Initial Prompt
**Heading:** Step 1: Write a Clear Vision

**Content intro:** The process began with a single, detailed message describing the desired application. Here is what that prompt covered:

**Numbered list:**
1. **Platform:** Web application — Node.js backend, Angular frontend (specific technology choices to match existing team standards)
2. **AI provider selector:** Let the user choose between OpenAI and Google Gemini APIs
3. **Model selector:** Show only models appropriate for the task
4. **API key field:** Allow the user to enter their own API key
5. **PDF upload:** Drag-and-drop style file upload widget
6. **Chat interface:** Conversation UI with a pre-filled default prompt
7. **Default prompt:** Marketing-oriented summary of veterinary diagnostic tests from an uploaded PDF
8. **Document context:** The uploaded PDF should remain in the conversation for follow-up questions — no need for a database

**Bottom callout:** *The quality of this initial prompt directly determined the quality of what came back. Vague in = vague out.*

**Speaker notes:** This is one of the most important slides in the deck. Pause here. The person who wrote this prompt is not a software engineer — they're a domain expert who knew what they wanted. But notice how specific it is: it names the technology stack (Node.js, Angular), it describes each UI element, it explains the business use case for the default prompt, and it even specifies a constraint (no database needed). This level of specificity is what separates a useful AI output from a generic one. Encourage the audience: when they try this themselves, spend more time on the initial description than they think they need to.

---

### SLIDE 6 — The Q&A Phase: AI Asks the Questions
**Heading:** Step 2: Let the AI Clarify Before It Codes

**Content intro:** Before writing a single line of code, Claude Code asked six clarifying questions:

**Two-column layout of questions and what they revealed:**

| Question Asked | Why It Mattered |
|---|---|
| Should the API key live in a config file or the UI? | Security and user experience trade-off |
| Should the frontend call the AI APIs directly, or through the backend? | Architecture and corporate security policy |
| Is session persistence needed (database)? | Scope and complexity decision |
| What telemetry should be captured? | Clarified this was about the coding session, not the app |
| Which version of Angular? | Confirmed latest (v19) to avoid version mismatch |
| Should the default prompt be written now or iterated later? | Confirmed: write a solid first draft now |

**Bottom callout:** *Six questions. Six decisions made before any code was written. This is where architecture happens.*

**Speaker notes:** This slide often surprises people. They expect AI to just start generating code immediately. The Q&A phase is actually a feature, not a delay. Each question forced a real decision that would have had to be made eventually — either up front in conversation, or later as a painful bug or rework. Point out the second question specifically: the decision to proxy AI API calls through the backend (rather than calling them from the browser) turned out to be critical when a corporate network security tool blocked a direct call later. That decision, made in a two-sentence Q&A exchange, saved significant debugging time.

---

### SLIDE 7 — Architecture in Plain English
**Heading:** Step 3: Agree on the Blueprint

**Content intro:** The Q&A answers led to a clear architecture — agreed upon before coding started.

**Simple architecture diagram (described for visual creation):**
Create a clean three-tier diagram:

```
[Browser — Angular 19 UI]
        ↓ HTTP (localhost)
[Node.js / Express Backend]    ← API keys stored here
        ↓ HTTPS
   ┌────┴────┐
[OpenAI API]  [Google Gemini API]
```

**Key decisions listed below the diagram:**
- **Backend proxies all AI calls** — API keys never touch the browser
- **PDF sent as base64 data** — avoids dedicated file upload endpoints that may be blocked by corporate network security
- **Stateless backend** — full conversation history sent with every request; no database required
- **Only PDF-capable models offered** — filters out models that cannot read document attachments

**Speaker notes:** You don't need to explain every line of this diagram. The executive-level point is: these four decisions were made in a conversation, before any code was written, and they shaped everything that followed. The one about avoiding dedicated file upload endpoints became especially important — more on that shortly. Architecture decisions made in conversation with AI are still real architecture decisions.

---

### SLIDE 8 — The Code Generation
**Heading:** Step 4: From Blueprint to 28 Files

**Content:**
With requirements understood and architecture agreed upon, Claude Code generated the complete application.

**Stats block (large, visual):**
- **28 files** created
- **~2,000 lines** of code
- **1 session** — no breaks, no handoffs

**What was generated:**
- Complete Node.js/Express backend with API routing and file handling
- Angular 19 frontend with four components (configuration panel, file upload, chat interface, root layout)
- API integrations for both OpenAI and Google Gemini
- Angular Material design system for the UI
- Proxy configuration so frontend talks only to the local backend
- Environment file template for API key configuration

**Visual suggestion:** A placeholder slide element labeled "Screenshot: Finished Application UI" — speaker will demo the live app.

**Speaker notes:** The 28 files / single session stat tends to land with this audience. Contextualize it: a small engineering team might take 1-2 weeks to produce this application through a normal development process — requirements gathering, design, development, code review, testing. This was a working prototype in an afternoon. The important caveat: this is a prototype. It's a proof-of-concept. For production use, engineering review, security hardening, and testing would be required. But as a proof that the idea works and is worth investing in? It delivered that in hours.

---

### SLIDE 9 — When Reality Meets the Blueprint
**Heading:** Step 5: Debugging in the Real World

**Content intro:** No application works perfectly the first time — even with AI writing the code. Here is what happened, and how it was resolved.

**Three-column layout (each is a "debugging story"):**

**Column 1 — The Missing Package**
- *What happened:* The frontend refused to start — a required build tool package was missing from the dependency list
- *How it was caught:* Error message on first launch
- *How it was fixed:* One line added to the package configuration file; problem resolved in under two minutes
- *Lesson:* Manually written configuration files can miss things. AI-generated code should always be verified by running it.

**Column 2 — The Corporate Network Block**
- *What happened:* Uploading a PDF triggered a 403 error from Zscaler (the corporate network security proxy), blocking the request to OpenAI's file upload endpoint
- *How it was caught:* Error in the browser — Zscaler's block page appeared in the response
- *How it was fixed:* Claude Code recognized the pattern immediately: the original design used a dedicated file-upload endpoint, which DLP policies target. It rewrote the upload logic to send the PDF as embedded data within a regular API message — the same approach used for Google Gemini — avoiding the blocked endpoint entirely
- *Lesson:* Enterprise environments have real constraints. AI tools can adapt to them quickly when the constraint is clearly described.

**Column 3 — The Invisible Scrollbar**
- *What happened:* The chat window displayed AI responses but couldn't scroll — long responses were cut off
- *How it was caught:* Manual testing (user reported it; a screenshot was shared)
- *How it was fixed:* A CSS layout issue — a missing two-word property (`min-height: 0`) at multiple levels of the page structure. Required two iterations to fully resolve
- *Lesson:* Debugging UI issues benefits from screenshots. The more context you give an AI tool, the faster it diagnoses the problem.

**Speaker notes:** This slide is often the most relatable for executives. Things broke. They got fixed. The interesting part is *how* they got fixed — through conversation, by providing error messages and screenshots to the AI tool, and by trusting the tool to diagnose and correct its own output. The Zscaler example is particularly worth lingering on: the AI didn't know about our corporate security environment in advance, but once told what the error was and where it came from, it adapted the design immediately. That's a meaningful capability.

---

### SLIDE 10 — Documentation as Part of the Process
**Heading:** Step 6: Documentation Wasn't an Afterthought

**Content:**
Typically, documentation is the last thing written — if it's written at all. In this session, it was woven throughout.

**What was produced alongside the code:**

| Document | Purpose |
|---|---|
| `README.md` | Tutorial-quality setup and usage guide for the application, including architecture explanation and design rationale |
| `.gitignore` | Tells the version control system which files to exclude (API keys, build artifacts, machine-specific settings) |
| `claude-code-session.log` | Running log of the development session — decisions made, files created, issues resolved — for telemetry and reference |

**Callout:** *The README was written to explain not just* how *to run the app, but* why *it works the way it does — making it a learning resource for the next person who picks it up.*

**Speaker notes:** This is a subtle but important point for executives thinking about AI-assisted development at scale. Documentation has historically been a discipline problem — developers write code faster than they write docs. AI tools change this: generating a thorough README takes seconds, and it can be done *as part of* the coding session rather than scheduled for later (and then never done). The session log is also worth mentioning: even without programmatic access to token counts, maintaining a narrative log of what happened and why is valuable institutional knowledge.

---

### SLIDE 11 — What the Finished App Looks Like
**Heading:** The Result

**Content:**
*(This slide is a visual showcase — minimal text)*

**Visual layout suggestion:** Large screenshot or mockup of the finished application UI, showing:
- Left sidebar with Configuration panel (API selector, model dropdown, API key field) and PDF upload widget with green checkmark
- Main chat area with a sample AI response rendered in formatted markdown
- Clean Angular Material design throughout

**Caption below image:** *Built in a single session. Zero prior code. Two AI APIs. Full markdown rendering. Corporate-network-compatible.*

**Placeholder text for speaker:** *(Live demo follows — speaker will show the running application)*

**Speaker notes:** Let the visual do the work here. If you're doing a live demo immediately after, keep this slide brief. If the demo is later or at risk due to connectivity, make sure this screenshot is high quality and shows a real AI response in the chat window. The combination of the professional UI and the formatted AI output is what makes it land — it doesn't look like a prototype.

---

### SLIDE 12 — What Made This Work
**Heading:** Key Factors in a Successful Vibe Coding Session

**Content (icon-based list, 5 items):**

🎯 **Specific initial requirements**
The original prompt named the technology stack, described each UI element, explained the business use case, and stated constraints. Vague prompts produce vague results.

❓ **Embracing the Q&A phase**
Letting the AI ask clarifying questions before coding started led to better architecture decisions — including one that prevented a major problem later.

📸 **Sharing context when things broke**
Error messages were pasted in full. Screenshots were shared. The more context provided, the faster problems were diagnosed.

🔄 **Iterating, not starting over**
When something didn't work, the conversation continued. The AI corrected its own output. Persistence through small failures is part of the process.

📝 **Treating documentation as deliverable**
README, .gitignore, and session notes were requested as part of the work, not added later.

**Speaker notes:** This is your "so what" slide for the how-to portion of the talk. If someone in the audience leaves and tries vibe coding tomorrow, these five behaviors are what separate a productive session from a frustrating one. Spend at least two minutes here. Invite the audience to write these down.

---

### SLIDE 13 — What This Means for You
**Heading:** Implications for Our Organization

**Content (three sections):**

**For individual leaders:**
- Domain expertise + AI tools = meaningful prototypes without an engineering team
- "I have an idea, let me try it" is now a viable posture
- The learning curve is real but shorter than expected — the first session is the hardest

**For your teams:**
- Engineers using AI tools are meaningfully more productive — this affects how you staff and scope projects
- AI-generated prototypes can accelerate requirements conversations — show, don't just describe
- The human review step still matters: AI writes fast, humans must verify

**For the organization:**
- Proof-of-concept timelines are compressing — weeks to days, days to hours
- The cost of "let's just try it" has dropped significantly
- Governance frameworks for AI-generated code are worth establishing now, before they're urgently needed

**Speaker notes:** Calibrate this to the specific audience. If your executives are primarily focused on their own personal use ("I want to try this"), lean into the first section. If they're thinking about team productivity and org implications, the second and third sections are more relevant. This is also a good place to acknowledge that the tools are moving fast — what's true today may be more capable in six months.

---

### SLIDE 14 — Live Demo
**Heading:** Let's See It Running

**Content:**
*(Placeholder slide — speaker transitions to live demonstration)*

**Visual:** Large centered text or icon indicating "LIVE DEMO"

Suggested demo flow for speaker reference (in notes):
1. Open the application at localhost:4200
2. Show the configuration panel — select OpenAI, GPT-4o, enter API key
3. Drag and drop a veterinary diagnostics PDF onto the upload widget
4. Show the upload confirmation (green checkmark)
5. Show the pre-filled default prompt in the chat input
6. Send the message and wait for the response
7. Point out the markdown formatting in the AI response (headings, bullet lists)
8. Type a follow-up question to demonstrate multi-turn conversation
9. Switch to Gemini to show API flexibility (if time permits)

**Speaker notes:** Have a backup screenshot ready in case of connectivity issues. Pre-upload a PDF before the session starts so the upload step is fast. Consider having a second browser tab ready with a completed conversation in case the live generation is slow.

---

### SLIDE 15 — Where to Start
**Heading:** Your First Vibe Coding Session

**Content:**

**Step 1 — Choose a tool**
Claude Code (terminal-based, powerful), GitHub Copilot (IDE-integrated), or start with Claude.ai for a lower-barrier introduction.

**Step 2 — Pick a small, real problem**
An internal report formatter. A data lookup tool. A document summarizer for a workflow you own. Start with something you understand deeply.

**Step 3 — Write a specific prompt**
Describe what you want in detail. Name the inputs, the outputs, and any constraints. More specificity = better results.

**Step 4 — Engage the Q&A**
When the AI asks clarifying questions, answer them thoughtfully. These are real design decisions.

**Step 5 — Test it yourself**
Run what gets generated. Report errors back to the AI in full. Iterate.

**Step 6 — Ask for documentation**
Before ending the session, ask the AI to write a README explaining what was built and how to run it.

**Callout at bottom:** *The goal of the first session isn't perfection. It's the experience of turning a description into working software — and understanding what that feels like.*

**Speaker notes:** End on an action-oriented note. Executives often leave training inspired but without a clear next step. This slide gives them one. You might invite two or three people to commit to trying a vibe coding session in the next two weeks and reporting back. The specific example you walked through today is available as a reference — the README explains how it works and why each decision was made.

---

### SLIDE 16 — Closing / Q&A
**Heading:** Questions?

**Content:**
- Application code and documentation available at: [repo location — speaker to fill in]
- Session walk-through notes: `claude-code-session.log`
- Speaker contact: [speaker to fill in]

**Visual suggestion:** Return to the opening image aesthetic — the person at the laptop and the finished application side by side — with a subtle "the gap is smaller than you think" tagline.

**Speaker notes:** Leave 8-10 minutes for questions. Common questions to be ready for:
- *"Is the code good enough to put in production?"* — Not without engineering review, security hardening, and testing. But it's good enough to prove the concept and have a real conversation with engineering about building it properly.
- *"What does this cost?"* — API costs are pay-per-use and relatively modest for prototyping. Claude Code itself is subscription-based. The economics are very favorable compared to engineering time.
- *"What are the risks?"* — API keys must be protected. AI-generated code should be reviewed before production use. Data sent to AI APIs is subject to the provider's privacy policies — be thoughtful about sensitive data.
- *"Can anyone do this?"* — The barrier is lower than most people expect, but it is not zero. Comfort with technology helps. Willingness to read error messages and iterate is essential.

---

## DESIGN SPECIFICATIONS

**Color palette:** Professional and modern. Suggested: deep navy (#1a2b5e) as primary, white backgrounds for content slides, a warm amber or teal as accent color for callouts and highlights. Avoid generic "AI blue" gradients unless used subtly.

**Typography:** Clean sans-serif. Suggested: Inter or Calibri for body, slightly larger weight for headings. Keep body text at 18pt minimum for readability in a large room.

**Slide count:** 16 slides for a 45-minute talk (approximately 2.5-3 minutes per slide, with extra time for the demo and Q&A).

**Logo/branding:** Add organization logo to the title slide and footer of content slides. [Speaker to provide logo asset.]

**Animations:** Minimal. Bullet points may appear one at a time on complex slides (slides 5, 6, 12, 13). No decorative animations.

**Speaker notes:** Include on every slide as specified above. Format as complete sentences, written in first person for the speaker.

---

## ADDITIONAL ASSETS TO PREPARE

1. **Screenshot of Claude Code in action** — terminal showing a natural-language prompt being answered with generated code
2. **Screenshot of the finished application** — showing the chat UI with a real AI response in markdown format
3. **Architecture diagram** — the three-tier diagram described in Slide 7, rendered as a clean vector graphic
4. **Organization logo** — for title slide and footer
5. **Backup demo screenshots** — full conversation flow in case live demo cannot run
