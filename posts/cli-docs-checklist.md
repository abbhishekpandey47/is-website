## Introduction

Most SaaS products have a CLI. That’s great because it means developers can use your product in their own workflows, automate tasks, and build faster. But here’s the thing: if your product has a CLI, that also means you need CLI documentation. And chances are, you do have some CLI docs for your developer users.

But let me ask you - do you (_or your developers or technical writers_) have specific checkpoints in mind while writing them? Are your CLI docs truly developer-focused, or are they just a list of commands without context?

Writing CLI docs isn’t just about listing flags and options. It’s about making developers feel confident and in control, so they can integrate your product, build faster, and stick around.

That’s why I’m sharing the **secret checklist** our team of developers and technical writers at Infrasity (_a developer marketing agency_) uses to write CLI docs for B2B SaaS startups. You can even use this checklist to verify if you’re doing it right.

_Oh, and I’ll be sharing a few secret pointers that we don’t usually disclose, so let’s keep it between us, okay?_ 

Let’s dive in!

## Pre-Writing: Plan Like a Developer for Effective CLI Docs

Before beginning to write CLI documentation, it’s essential to think as a developer. The goal is to make it easy for them to learn, adopt, and use the CLI effectively, without guessing or getting stuck.

Let’s take an example. Imagine there’s a SaaS product that helps developers create workspaces with all dependencies pre-installed, think of it like spinning up fully configured development environments in seconds. The product has a full web UI where users can select the OS, write a config, and launch a workspace from the dashboard.

But here’s the thing: all of that functionality is also available via the command-line interface. With just a few commands, a developer can skip the dashboard entirely, automate their workflow, and spin up workspaces right from their terminal. That’s pretty essential, but only if the CLI docs make it clear how to do it.

### 1. Know the User

Who’s using your command line interface? They are likely to be backend engineers, DevOps teams, SREs, data engineers, platform engineers - basically, technical folks who live in the terminal. They write bash, Python, or CI/CD scripts to spin up environments, manage resources, or deploy code.

Even though they’re highly technical, they still need clear, concise docs that speak their language. Use the right terms, like “workspace,” “environment variables,” and “image versions,” but explain product-specific concepts. Don’t assume they know your platform inside out, clear guidance helps them move fast and avoid frustration.

Also, keep your keywords consistent. If you call it a “module” in the UI, call it a “module” in the CLI docs too; don’t suddenly switch to “resource” or “component.” Developers don’t care about your internal naming schemes. What they see in the product should match what they read in the docs. That’s how you build trust and make sure they don’t get stuck.

### 2. Define the CLI’s Purpose

Define the CLI’s purpose in one clear sentence. Tell developers exactly what the command-line interface does and why it matters, no vague statements. 

For example: “_Provision and manage fully-configured development workspaces from your terminal_.” This clear purpose ensures developers don’t spend much time guessing if the command line interface is for creating resources, deploying code, or running tests.

### 3. Map the Key Commands

For the developers to quickly comprehend what the command-line interface can do, list out every command with a clear and one-line explanation.

For example:
`workspace create` - Create a new workspace
`workspace list` -  List active workspaces
`workspace delete` -  Remove a workspace




