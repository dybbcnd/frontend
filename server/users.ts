"use server";

interface User {
    id: number; 
}    
export const get = async (): Promise<User[]> => {
    const data = await fetch('${process.env.APP_URL}/users');
    const json = await data.json();
    console.log(json);
    return json;

};