# Getting Started

Firstly, create the .env file and add the environment variables. The environment variables include,
* ```DATABASE_URL``` -&nbsp; The URL of the database.
* ```KEY_ID``` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- &nbsp;The key id provided by the razorpay API.
* ```KEY_SECRET``` &nbsp;&nbsp;&nbsp;- &nbsp;The secret key provided by the razorpay api.

Then, run ```npx prisma migrate dev --name init``` to migrate the relational database schema to the connected database.

Lastly, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [this url](http://localhost:3000) with your browser to see the result.

# About the project

## The Order page:
![image](https://github.com/navi-prem/canteen-ordering/assets/120002392/d97a134f-403b-48aa-8266-71fd0e9f287a)

The products are fetched from the database and are rendered to the user interface from where the user can interact and place their order.

## The Admin page:<br/>
![image](https://github.com/navi-prem/canteen-ordering/assets/120002392/80e6688b-cc69-49c4-a99b-5d0c8bc8e568)

The orders by the users are fetched from the database and is then sent to the admin page.
