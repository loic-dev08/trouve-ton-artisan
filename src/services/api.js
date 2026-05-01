const API_URL="http://localhost:3000/api";
const API_KEY= import.meta.env.VITE_API_KEY;

const headers ={
    "Content-Type": "application/json",
    "x-api-key": API_KEY
};

export async function apiGet(endpoint){
   const res = await fetch(`${API_URL}${endpoint}`,{headers});
   if(!res.ok){throw new Error("Erreur API");}
   return res.json();
  
}

export async function apiPost(endpoint,body) {
    const res = await fetch(`${API_URL}${endpoint}`,{
        method:"POST",
        headers,
        body: JSON.stringify(body)
    });
    if(!res.ok){throw new Error("Erreur API");}
    return res.json();
}
