import axios from "axios";

export const checkUserAuthLoader = async () => {
  try {
    const res = await axios.get("http://localhost:5001/gettokendetails/get-token", {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    const role = res.data.role;
    console.log("role in auth loader  ",res.data);
    if(role !== 'user')
    {
       throw new Response("Unauthorized", {
       status: 302,
       headers: { Location: "/userlogin" },
    });
    }
     
    
   return res.data;
  } catch (err) {
    throw new Response("Unauthorized", {
      status: 302,
      headers: { Location: "/userlogin" },
    });
  }
};


export const checkDriverAuthLoader = async () => {
    try {
    const res = await axios.get("http://localhost:5001/gettokendetails/get-token", {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    const role = res.data.role;
    console.log("role in auth loader  ",res.data);
    if(role !== 'driver')
    {
       throw new Response("Unauthorized", {
       status: 302,
       headers: { Location: "/login" },
    });
    }
    
   return res.data;
  } catch (err) {
    throw new Response("Unauthorized", {
      status: 302,
      headers: { Location: "/login" },
    });
  }

};