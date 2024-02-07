import React, {useState} from 'react';
import Cookies from 'js-cookie';

const AuthContext = React.createContext({
    token : '',
    userId:'',
    isLoggedIn:false,
    role :'',
    adminId:'',
    login:(token)=>{},
    logout:()=>{}
})



export const AuthContextProvider = (props)=>{

    const adminIdInit = Cookies.get('adminId');
    const toSetAdminId = !!adminIdInit?adminIdInit:null;
    const [adminId, setadminId] = useState(toSetAdminId);
    


    const initialtoken =  Cookies.get('jwt_token');
    const toSet = !!initialtoken?initialtoken:null;
    const [token,setToken] = useState(toSet);


    const initialId = Cookies.get('id');
    const toSetId = !!initialId?initialId:null;
    const [id, setId] = useState(toSetId);


    const initialRole = Cookies.get('role');
    const toSetrole = !!initialRole?initialRole:'user'
    const[role, setRole] = useState(toSetrole);



    
    const userIsLoggedIn = !!token;

    const loginHandler = (token, id, role, adminId)=>{
        setId(id);
        setToken(token);
        setRole(role);
        setadminId(adminId);
        Cookies.set('jwt_token', token);
        Cookies.set('id',id);
        Cookies.set('role', role);
        Cookies.set('adminId', adminId);
    }

    const logoutHandler = ()=> {
        Cookies.remove('jwt_token');
        Cookies.remove('id');
        Cookies.remove('role')
        Cookies.remove('adminId');
        setToken(null);
        setId(null);
        setRole('user');
        setadminId(null)

    }

    const contextValue = {
        token:token,
        userId:id,
        role:role,
        adminId,
        isLoggedIn:userIsLoggedIn,
        login:loginHandler,
        logout:logoutHandler
    }

    return(
        <AuthContext.Provider value ={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )

};


export default AuthContext;