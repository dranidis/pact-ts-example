# Consumer-driven contract testing

From: https://docs.pact.io/

>Pact is a code-first tool for testing HTTP and message integrations using contract tests. Contract tests assert that inter-application messages conform to a shared understanding that is documented in a contract. Without contract testing, the only way to ensure that applications will work correctly together is by using expensive and brittle integration tests.

## Build
```
cd pact-provider
npm i
cd ../pact-ts-consumer
npm i
```

## Test

### Consumer

Running:

```
npm test
```
generates the pact file inside the `pacts` folder.

### Provider

Run the provider:
```
node index.js
```

Run the test verification:
```
npm test
```

## Pact CLI

Install CLI:
```
curl -fsSL https://raw.githubusercontent.com/pact-foundation/pact-ruby-standalone/master/install.sh | PACT_CLI_VERSION=v2.0.3 bash
```

Publish pacts

```
pact-broker publish -b "http://localhost:9292" pacts --consumer-app-version=0.0.1
```
