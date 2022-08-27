/** 
 * @author  https://github.com/abderox
*/

export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('adria-user'));
    if (user && user.accessToken) {
        let req = Object.assign(
            {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization' : 'Bearer ' + user.accessToken ,
              },
            }
          );
      return req;
    } else {
      return {};
    }
  }



  