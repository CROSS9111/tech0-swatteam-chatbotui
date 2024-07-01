import { Conversation } from '@/types/chat';
import saveToCosmosDB from "@/pages/api/cosmos"

// 会話データを更新し、ローカルストレージに保存する関数
export const updateConversation = (
  
  updatedConversation: Conversation,  // 更新された会話オブジェクト
  allConversations: Conversation[],   // 現在のすべての会話リスト
) => {
  const updatedConversations = allConversations.map((c) => {
    if (c.id === updatedConversation.id) {
      return updatedConversation; // IDが一致する会話を更新
    }

    return c;
  });

  saveConversation(updatedConversation);
  saveConversations(updatedConversations);

  return {
    single: updatedConversation,
    all: updatedConversations,
  };
};

// 単一の会話データをローカルストレージに保存する関数
export const saveConversation = async(conversation: Conversation) => {
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  try {
    localStorage.setItem('selectedConversation', JSON.stringify(conversation));

    // db用にobjectを整形
    const db_selectedConversation = {
      folderId:conversation.folderId,
      id: "conversation.id",
      name: conversation.name,
      // modelId: conversation.model, 
      prompt: conversation.prompt,
      temperature: conversation.temperature,
    };
    // console.log('Saved conversation:', conversation);
    // エンドポイントAにPOSTリクエストを送信
    console.log("type")
    console.log(typeof(conversation))
    console.log(typeof(db_selectedConversation))

    // await saveToCosmosDB(db_selectedConversation)


  } catch (error) {
    console.error('Error saving conversation:', error);
    throw error;
  }
};
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
//   localStorage.setItem('selectedConversation', JSON.stringify(conversation));
//   console.log(conversation)
// };

// すべての会話データをローカルストレージに保存する関数
export const saveConversations = (conversations: Conversation[]) => {
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  try {
    localStorage.setItem('conversationHistory', JSON.stringify(conversations));
    // console.log('Saved conversations:', conversations);
  } catch (error) {
    console.error('Error saving conversations:', error);
    throw error;
  }
};
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
//   localStorage.setItem('conversationHistory', JSON.stringify(conversations));
//   console.log(conversations)
// };


  /////////////////////////////////////////////////////////////////////////////////////////////////////////





  /////////////////////////////////////////////////////////////////////////////////////////////////////////