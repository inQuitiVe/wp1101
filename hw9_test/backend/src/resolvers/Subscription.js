const Subscription = {

   updatemessage: {
    subscribe: (parent, args, { pubSub }) => {
      return pubSub.asyncIterator("MESSAGE_UPDATED");
    },
  },
}

export { Subscription as default };
