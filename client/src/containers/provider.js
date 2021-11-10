import React from "react";
import { Subscribe } from "unstated";
import allStores from "./index";

export default WrappedComponent => {
  
  const subscribeWrapper = ({ ...props }) => (

    <Subscribe to={allStores}>
        {(
          userStore,
          orderStore
        ) => (
          <WrappedComponent
            userStore={userStore}
            orderStore={orderStore}
            {...props}
          />
        )}
    </Subscribe>

  )

  return subscribeWrapper;
};

