# AdSync – AI Campaigns-in-a-Box

AdSync turns a short business description into ready-to-publish ad campaigns with copy, images, targeting, and tracking links for Meta (Facebook/Instagram).

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

## 📋 Features (MVP)

- **Brief Form**: Simple input for business details, location, offer, and brand tone
- **AI Generation**: Creates 3-5 ad variants per campaign with:
  - Ad copy (primary text, headline, description) in Hebrew/English
  - Image suggestions (currently using Unsplash placeholders)
  - CTA buttons and tracking links
  - Audience targeting (location, age, interests)
- **Meta Publishing**: Mock implementation ready for real Meta Marketing API integration
- **Dashboard**: View campaign performance (mock data)
- **Settings**: Configure brand assets and API credentials

## 🎯 Workflow

1. **Create Brief** → Fill in your business details and campaign goals
2. **Generate Variants** → AI creates multiple ad variations
3. **Review & Edit** → Preview variants, edit as needed
4. **Publish** → Push to Meta (currently mocked, paused by default)
5. **Monitor** → Track performance in dashboard

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **UI**: Tailwind CSS + shadcn/ui
- **Routing**: React Router
- **State**: React Query + Session Storage
- **Notifications**: Sonner toasts
- **APIs** (to be integrated):
  - OpenAI GPT-5 for copy generation
  - Leonardo for image generation
  - Meta Marketing API for publishing

## 📂 Project Structure

```
src/
├── components/
│   ├── TopNav.tsx          # Navigation bar
│   ├── VariantCard.tsx     # Ad variant display
│   └── ui/                 # shadcn components
├── pages/
│   ├── Brief.tsx           # Campaign brief form
│   ├── Generate.tsx        # Variant generation & preview
│   ├── Dashboard.tsx       # Performance analytics
│   └── Settings.tsx        # Brand & API configuration
├── lib/
│   ├── api.ts              # API utilities (currently mocked)
│   ├── utm.ts              # UTM parameter builder
│   └── utils.ts            # General utilities
└── index.css               # Design system & theme
```

## 🎨 Design System

AdSync uses a modern dark theme with:
- **Primary**: Purple (`#8B5CF6`) with glow effects
- **Accent**: Electric blue (`#3B82F6`)
- **Backgrounds**: Dark slate gradients
- **Components**: Card-based layouts with shadows and animations

All colors and styles are defined in `src/index.css` and `tailwind.config.ts` using semantic tokens.

## 🔌 API Integration (Next Steps)

### 1. OpenAI Integration
Replace mock in `src/lib/api.ts` with real OpenAI API:
```typescript
const response = await openai.chat.completions.create({
  model: "gpt-5",
  messages: [...]
});
```

### 2. Leonardo Image Generation
Add Leonardo API calls for image generation:
```typescript
const response = await fetch('https://cloud.leonardo.ai/api/rest/v1/generations', {
  headers: { 'Authorization': `Bearer ${LEONARDO_API_KEY}` },
  body: JSON.stringify({ prompt, width: 1024, height: 1024 })
});
```

### 3. Meta Marketing API
Implement real Meta publishing in `publishToMeta()`:
- Create ad images
- Create ad creatives
- Create ad sets with targeting
- Create ads (paused by default)

## 🗄️ Database Schema (Supabase)

When ready to add persistence:

```sql
-- Organizations & users
create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz default now()
);

-- Campaigns
create table campaigns (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references organizations(id),
  title text,
  objective text,
  status text check (status in ('draft','generated','published')),
  created_at timestamptz default now()
);

-- Ad creatives
create table ad_creatives (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references campaigns(id),
  network text check (network in ('meta','google')),
  copy jsonb,
  image_urls jsonb,
  cta text,
  final_url text,
  utm jsonb,
  audience jsonb,
  publish_ref jsonb,
  created_at timestamptz default now()
);
```

## 📝 Environment Variables

See `.env.example` for required variables:
- OpenAI API key
- Supabase URL & keys
- Leonardo API key
- Meta access token & ad account ID

## 🚧 Roadmap

- [ ] Real OpenAI integration for copy generation
- [ ] Leonardo API for image generation
- [ ] Meta Marketing API publishing
- [ ] Supabase database for persistence
- [ ] Google Ads support
- [ ] A/B testing features
- [ ] Advanced analytics
- [ ] Multi-language support expansion
- [ ] Team collaboration features

## 📄 License

MIT

## 🤝 Contributing

This is an MVP. Contributions welcome for:
- Real API integrations
- Additional ad networks
- Advanced targeting options
- Performance optimizations
