# n8n-nodes-moorcheh

This is an n8n community node. It lets you use Moorcheh Vector Store API in your n8n workflows.

Moorcheh is a powerful vector store and AI platform that enables semantic search, document storage, and AI-powered question answering across your data.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Namespace Operations
- **Create**: Create a new namespace for storing documents or vectors
- **List**: List all available namespaces
- **Delete**: Delete a namespace and all its contents

### Document Operations
- **Upload**: Upload documents to a namespace for semantic search
- **Get**: Retrieve specific documents by their IDs
- **Delete**: Delete documents from a namespace

### Vector Operations
- **Upload**: Upload vector embeddings to a namespace
- **Delete**: Delete vectors from a namespace

### Search Operations
- **Search**: Perform semantic search across namespaces using text queries or vector embeddings

### Answer Operations
- **Generate**: Generate AI-powered answers based on namespace content using various LLM models

## Credentials

To use this node, you need a Moorcheh API key:

1. Sign up for a Moorcheh account at [console.moorcheh.ai](https://console.moorcheh.ai)
2. Navigate to your API settings
3. Generate an API key
4. Use the API key in the Moorcheh credentials in n8n

## Compatibility

- **n8n version**: 1.0.0 or later
- **Node.js version**: 20.15 or later

## Usage

### Creating a Namespace
1. Select the "Namespace" resource
2. Choose "Create" operation
3. Enter a namespace name
4. Select the type (Text or Vector)
5. For vector namespaces, specify the vector dimension

### Uploading Documents
1. Select the "Document" resource
2. Choose "Upload" operation
3. Enter the namespace name
4. Add documents with ID, text content, and optional metadata

### Searching Content
1. Select the "Search" resource
2. Choose "Search" operation
3. Enter your query (text or comma-separated vector values)
4. Specify target namespaces
5. Set top_k and threshold parameters

### Generating AI Answers
1. Select the "Answer" resource
2. Choose "Generate" operation
3. Enter the namespace name
4. Provide your question
5. Select an AI model and configure parameters

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Moorcheh API Documentation](https://console.moorcheh.ai/docs)
* [Moorcheh Console](https://console.moorcheh.ai)
