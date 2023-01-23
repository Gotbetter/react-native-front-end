import React from 'react';
import {useSelector} from "react-redux";

function MainContainer() {

    const {user} = useSelector(({auth}) => ({
        user: auth.user,
    }));


    return (
      <>
      {/*  main 화면의 ui 컴포넌트 작성  */}
      </>
    );
}

export default MainContainer;
