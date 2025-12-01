# AI Research Assistant

A powerful multi-model AI research platform built with React, TypeScript, and Lovable Cloud. Get comprehensive research answers powered by the latest AI models from Google and OpenAI.

## Features

### 🤖 Multi-Model AI Support
Access to 7 cutting-edge AI models:
- **Google Gemini 3 Pro Preview** - Next-generation flagship model
- **Google Gemini 2.5 Pro** - Top-tier multimodal capabilities
- **Google Gemini 2.5 Flash** - Balanced speed and intelligence
- **Google Gemini 2.5 Flash Lite** - Ultra-fast responses
- **OpenAI GPT-5** - Most capable reasoning model
- **OpenAI GPT-5 Mini** - Efficient performance
- **OpenAI GPT-5 Nano** - Speed optimized

### ⚡ Real-Time Streaming
- Live streaming responses for immediate feedback
- Token-by-token rendering for smooth UX
- Server-sent events (SSE) implementation

### 🎨 Beautiful Interface
- Clean, modern design with Tailwind CSS
- Responsive layout for all devices
- Dark mode support
- Markdown rendering for formatted responses

### 📚 Research Features
- Quick action queries for common research topics
- Session history tracking
- Model comparison capabilities
- Clear conversation management

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Radix UI
- **Styling**: Tailwind CSS
- **Backend**: Lovable Cloud (Supabase)
- **Edge Functions**: Deno runtime
- **AI Gateway**: Lovable AI Gateway
- **Markdown**: react-markdown

## Architecture

### Edge Functions
The application uses a single edge function (`ai-research`) that:
- Handles all AI model requests
- Implements streaming responses
- Manages rate limiting and error handling
- Adds research-specific system prompts

### Frontend Architecture
- **Hooks**: Custom `useStreamingChat` for managing streaming state
- **Components**: Modular research components
- **State Management**: React hooks with local state
- **Routing**: React Router for navigation

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Lovable Cloud account (auto-provisioned)

### Installation

```bash
# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

### Environment Variables
The following are auto-configured by Lovable Cloud:
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Supabase anon key
- `LOVABLE_API_KEY` - AI Gateway authentication (server-side)

## Usage

1. **Select a Model**: Choose from 7 AI models based on your needs
   - Premium: Best for complex reasoning and accuracy
   - Balanced: Good mix of speed and intelligence
   - Fast: Quick responses for simple queries

2. **Ask Your Question**: Type your research question in the input field

3. **View Results**: Watch as the AI streams back comprehensive research in real-time

4. **Quick Actions**: Use pre-defined research topics to get started quickly

## Model Selection Guide

### When to Use Premium Models
- Complex research requiring deep analysis
- Multi-step reasoning tasks
- High accuracy requirements
- Long-form content generation

### When to Use Balanced Models
- General research questions
- Standard analysis tasks
- Good performance with reasonable speed
- **Recommended as default**

### When to Use Fast Models
- Quick queries and summaries
- Simple classification tasks
- High-volume requests
- Speed-critical applications

## API Reference

### Edge Function Endpoint
```
POST /functions/v1/ai-research
```

**Request Body:**
```typescript
{
  messages: Array<{
    role: "user" | "assistant" | "system";
    content: string;
  }>;
  model: string; // Model ID from AI_MODELS
  stream?: boolean; // Default: true
}
```

**Response:**
- Streaming: `text/event-stream` with SSE format
- Non-streaming: JSON with completion

## Error Handling

The application handles:
- **429 Rate Limit**: Displays friendly message to retry later
- **402 Payment Required**: Notifies user to add credits
- **500 Server Errors**: Shows specific error details
- **Network Issues**: Graceful degradation with error messages

## Development

### Project Structure
```
src/
├── components/
│   └── research/        # Research-specific components
├── hooks/
│   └── useStreamingChat.ts  # Streaming chat hook
├── lib/
│   └── aiModels.ts      # Model definitions
├── pages/
│   └── Index.tsx        # Main research page
└── styles/
    └── markdown.css     # Markdown styling

supabase/
└── functions/
    └── ai-research/     # Edge function
```

### Adding New Models
1. Add model to `src/lib/aiModels.ts`
2. Ensure model ID matches Lovable AI Gateway format
3. Update documentation

### Customizing System Prompts
Edit the system prompt in `supabase/functions/ai-research/index.ts` to customize research behavior.

## Performance Optimization

- **Streaming**: Reduces time to first token
- **Efficient Parsing**: Chunked SSE processing
- **Lazy Loading**: Components loaded on demand
- **Optimized Rendering**: React.memo for expensive components

## Security

- API keys stored as Supabase secrets
- CORS properly configured
- Input validation on edge functions
- Rate limiting protection

## Deployment

The application automatically deploys through Lovable:
- **Frontend**: Auto-deployed on code changes
- **Edge Functions**: Auto-deployed through Lovable Cloud
- **Production URL**: Available through Lovable publish

## Rate Limits

Lovable AI has workspace-level rate limits:
- Per-minute request limits
- Usage-based pricing after free tier
- 429 responses when limits exceeded

## Troubleshooting

### Common Issues

**Streaming not working:**
- Verify edge function is deployed
- Check browser console for errors
- Ensure WebSocket support

**Rate limit errors:**
- Wait before retrying
- Consider using faster models for high volume
- Check workspace usage in Lovable settings

**Model not responding:**
- Verify model ID is correct
- Check Lovable AI gateway status
- Review edge function logs

## Future Enhancements

- [ ] Multi-model comparison view
- [ ] Research export (PDF, Markdown)
- [ ] Conversation persistence
- [ ] Source citation tracking
- [ ] Research templates
- [ ] Collaborative research sessions
- [ ] Advanced filtering and search

## Contributing

This project is built with Lovable. To contribute:
1. Fork the project in Lovable
2. Make your changes
3. Test thoroughly
4. Submit feedback through Lovable

## License

MIT License - see LICENSE file for details

## Support

For issues or questions:
- Lovable Discord: [Join Community](https://discord.gg/lovable)
- Documentation: [docs.lovable.dev](https://docs.lovable.dev)
- Lovable AI Docs: [AI Gateway Documentation](https://docs.lovable.dev/features/ai)

## Acknowledgments

- Built with [Lovable](https://lovable.dev)
- Powered by [Lovable AI Gateway](https://docs.lovable.dev/features/ai)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Inspired by GPT Researcher

---

**Built with ❤️ using Lovable**
