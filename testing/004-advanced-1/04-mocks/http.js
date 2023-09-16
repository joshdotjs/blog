const http = async ({ url, method='GET', body={}, debug=false }) => {

  if (debug) {
    let debug_str = `%cmaking REQUEST to ${url} \n- METHOD:  ${method} \n- BODY: ${JSON.stringify(body, null, 2)}`;
    // console.orange(debug_str, 'color: orange');
    console.yellow(debug_str);
  }

  let resp;

  if (method === 'GET') {
    resp = await fetch(url);
  }
  else {
    resp = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( body ),
    });
  }

  // TODO: PROPER ERROR HANDLING!!!
  if (!resp.ok) throw new Error('!resp.ok  =>  status not 2xx');

  const data = await resp.json();

  if (debug) {
    debug_str = `%cresponse -- DATA: ${JSON.stringify(data, null, 2)} \n CODE: ${resp.status}`;
    // console.log(debug_str, 'color: #bada55');
    console.green(debug_str, 'color: #bada55');
  }

  return data;
};

export { http };