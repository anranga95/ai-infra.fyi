export const TOKEN_DATA = {
  training: {
    "GPT-4.5": {
      tokensPerSecPerGPU: 750,
      datasetTokens: 20e12,
      source: "Estimated from OpenAI 2024 compute spend"
    },
    "GPT-4": {
      tokensPerSecPerGPU: 850,
      datasetTokens: 13e12,
      source: "EpochAI database, estimated from training timeline"
    },
    "Claude Sonnet 4": {
      tokensPerSecPerGPU: 800,
      datasetTokens: 18e12,
      source: "Estimated from Anthropic announcements"
    },
    "Llama 3.1 405B": {
      tokensPerSecPerGPU: 650,
      datasetTokens: 15e12,
      source: "Meta Llama 3.1 Report"
    },
    "Llama 3.1 70B": {
      tokensPerSecPerGPU: 1200,
      datasetTokens: 15e12,
      source: "Meta Llama 3.1 Report"
    }
  },
  inference: {
    "GPT-4 class (280B)": {
      tokensPerSecPerGPU: 12,
      tokensPerQuery: 550,
      source: "vLLM benchmarks, OpenAI API averages"
    },
    "Llama 70B class": {
      tokensPerSecPerGPU: 28,
      tokensPerQuery: 400,
      source: "vLLM benchmarks"
    },
    "Llama 8B class": {
      tokensPerSecPerGPU: 85,
      tokensPerQuery: 280,
      source: "vLLM benchmarks"
    }
  },
  reasoning: {
    "Low": {
      multiplier: 3,
      description: "Basic chain-of-thought",
      source: "Public CoT research"
    },
    "Medium": {
      multiplier: 10,
      description: "Extended reasoning (o1-mini level)",
      source: "OpenAI o1 blog post"
    },
    "High": {
      multiplier: 100,
      description: "Deep reasoning (o1 level)",
      source: "OpenAI o1 technical card"
    },
    "Extreme": {
      multiplier: 1000,
      description: "o3-level extended thinking",
      source: "OpenAI o3 announcement"
    }
  }
};

export type TrainingModel = keyof typeof TOKEN_DATA.training;
export type InferenceModel = keyof typeof TOKEN_DATA.inference;
export type ReasoningLevel = keyof typeof TOKEN_DATA.reasoning;
