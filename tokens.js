
import { Tiktoken } from "js-tiktoken/lite";
import o200k_base from "js-tiktoken/ranks/o200k_base";

const enc = new Tiktoken(o200k_base);

const query = "Hello world hassan";
const encode = enc.encode(query);

console.log(encode);

const decode = enc.decode(encode)
console.log(decode);
