import { gql } from "@apollo/client";

export const CREATE_CHATBOX_MUTATION = gql`
  mutation CreateChatBox($name1: String!, $name2: String!) {
    createChatBox(name1: $name1, name2: $name2) {
      id
      name
      messages
    }
  }
`;

export const CREATE_MESSAGE_MUTATION = gql`
  mutation CreateMessage($from: String!, $to: String!, $body: String) {
    createMessage(from: $from, to: $to, body: $body) {
      id
      sender
      body
    }
  }
`;

