# medusa-file-sanity

Store uploaded files to your Medusa backend on Sanity.

## Features

-   Store product images on Sanity CMS

---

## Prerequisites

-   [Medusa backend](https://docs.medusajs.com/development/backend/install)
-   [Sanity CMS](https://www.sanity.io/)

---

## How to Install

1\. Run the following command in the directory of the Medusa backend:

```bash
yarn add medusa-file-sanity
```

2\. Set the following environment variables in `.env`:

```bash
SANITY_PROJECT_ID=some-project-id
SANITY_DATASET=production
SANITY_TOKEN=some-token
```

3\. In `medusa-config.js` add the following at the end of the `plugins` array:

```js
const plugins = [
	// ...
	{
		resolve: `medusa-file-sanity`,
		options: {
			projectId: process.env.SANITY_PROJECT_ID,
			dataset: process.env.SANITY_DATASET,
			token: process.env.SANITY_TOKEN,
			apiVersion: '2021-10-21',
			useCdn: false, // `false` if you want to ensure fresh data
		},
	},
]
```

---

## Test the Plugin

1\. Run the following command in the directory of the Medusa backend to run the backend:

```bash
yarn start
```

2\. Upload an image for a product using the admin dashboard or using [the Admin APIs](https://docs.medusajs.com/api/admin#tag/Upload).
