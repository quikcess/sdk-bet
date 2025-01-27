<h1 align="center">@quikcess/sdk-bet</h1>
<p align="center">Software development kit for Quikcess bet bots.</p>

<div align="center">
  <div style="width: fit-content; display: flex; align-items: flex-start; gap: 4px;">
    <img alt="NPM License" src="https://img.shields.io/npm/l/@quikcess/sdk-bet">
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dw/@quikcess/sdk-bet">
    <a href="https://npmjs.com/package/@quikcess/sdk-bet">
      <img alt="NPM Version" src="https://img.shields.io/npm/v/@quikcess/sdk-bet">
    </a>
  </div>
</div>

## Installation

```bash
npm install @quikcess/sdk-bet
// or
yarn add @quikcess/sdk-bet
// or
pnpm add @quikcess/sdk-bet
```

## Documentation

Visit our [official API documentation](https://docs.quikcess.com/sdk-bet-reference/) for more information about this service.

## Getting Started

- _Login and get your API Key at [https://discord.gg/quikcess](https://discord.gg/quikcess)._

```ts
import { Betting } from "@quikcess/sdk-bet";
// CommonJS => const { Betting } = require("@quikcess/sdk-bet");

const client = new Betting("Your API Key");
```
