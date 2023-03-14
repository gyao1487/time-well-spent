import { useEffect } from "react";
import googleOneTap from 'google-one-tap'
import { useStateContext,useDispatchContext } from "../../utils/GlobalState";
import ACTIONS from '../../utils/actions'
import { ADD_GOOGLE_VOLUNTEER } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import env from 'react-dotenv'

export default function GoogleSignUp() {
    
    const state = useStateContext();
    const dispatch = useDispatchContext();
    const [createGoogleVolunteer, { error }] = useMutation(ADD_GOOGLE_VOLUNTEER);

        const clientID = process.env.REACT_APP_GOOGLE_CLIENT_ID
        const options = {
            client_id: clientID, 
            auto_select: false, 
            cancel_on_tap_outside: false, 
            context: 'signup',
        };
        function decodeJwtResponse(token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
          }

        googleOneTap(options, async (response) => {
            const res = await fetch('/api/google-signup',{
                method: 'POST',
                body: JSON.stringify({
                    token: response.credential
                }),
                headers: {
                    'Content-Type' : 'application/json',
                },
            });
            if(res.ok){
                const userData = await res.json();
                console.log(userData);
                const { name: username, email, picture } = userData
                localStorage.setItem('userData', JSON.stringify({username, email, picture}));
                const { data, errors } = await createGoogleVolunteer({
                    variables: {
                        // _id: userData.sub,
                        username: userData.name,
                        email: userData.email,
                        jti: userData.jti,
                        sub: userData.sub,
                        picture: userData.picture
                    }
                })
                Auth.login(data.createGoogleVolunteer.token)
            }
            const responsePayload = decodeJwtResponse(response.credential);
            dispatch({type: ACTIONS.GOOGLE_INFO, payload: responsePayload})
            console.log(responsePayload);
        });
       
        
    return (
        <div></div>
    )
}
