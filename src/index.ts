import { writeFile } from "fs/promises";
import { StudomatClient } from "./StudomatClient";


const cookie = process.env.cookie;
if (!cookie) {
  for(let i = 0; i< 100;++i) console.warn("cookie is not set. Run as: cookie='<your cookie>' npm run start");
  throw new Error("Shit Fuck");
}else 
{
  console.log(`Your cookie is ${cookie}`);
}
const main = async () => {
  const client = new StudomatClient(cookie);
  const all = await client.getAll();
  await writeFile("allData.json", JSON.stringify(all));
  console.log(all);
}

main().then(i => console.log("END")).catch(i => console.log("Error", i));