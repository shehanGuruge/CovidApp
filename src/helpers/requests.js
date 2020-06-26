import {HTTPMethods,POSTTYPE} from '../constants/HTTPMethods'

export async function fetchFromAPI({URL: url, request_method: method, header: _headers, body : _body = ""}){

    var request = constructRequest(method,_body)
    console.log(request)
    try {
        let response = await fetch(url,request);
        let json = await response.json();
        return json;
      } catch (error) {
        console.error(error);
    }
}

function constructRequest (method, body){
    let request = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    switch(method){
        case HTTPMethods.GET:
            request.method = HTTPMethods.GET
            break;
        case HTTPMethods.POST:
            request.method = HTTPMethods.POST
            request.body = body
            break;
        case HTTPMethods.PUT:
            request.method = HTTPMethods.PUT
            request.body = body
            break;
        default: 
            break;

    }
       
    return request
}

