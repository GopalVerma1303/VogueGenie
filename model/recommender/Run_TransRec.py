import torch
from TransRec import TransRec
from TransRec_config import TransRecConfig
import numpy as np

# Embedding matrix -> for creating matrix of words present in data
def get_embedding_matrix(vocab_size, word_to_idx, embedding_index):
  emb_dim = 50
  matrix = np.zeros((vocab_size,emb_dim))
  for word,idx in word_to_idx.items():
    embedding_vector = embedding_index.get(word)
    if embedding_vector is not None:
      matrix[idx] = embedding_vector
  return matrix

def embed(total_words):
    f = open("./glove.6B.50d.txt" , encoding='utf8')
    embedding_index = {}
    embedding_to_word = {}
    for line in f:
        values = line.split()
        word = values[0]
        word_embedding = np.array(values[1:],dtype='float')
        embedding_index[word] = word_embedding
        embedding_to_word[word_embedding] = word


    # Creating word_to_idx & idx_to_word
    # Here total words are unique words in entire dataset
    word_to_idx = {}
    idx_to_word = {}
    for i,word in enumerate(total_words):
        word_to_idx[word] = i+1
        idx_to_word[i+1] = word


    embedding_matrix = get_embedding_matrix(len(total_words), word_to_idx, embedding_index)
    return embedding_matrix, embedding_index, embedding_to_word


def test_run_transact(action_type_seq, item_embedding_seq, action_time_seq, request_time, item_embedding):
    action_vocab = list(range(0, 20))
    full_seq_len = 100
    test_batch_size = 8
    action_emb_dim = 32
    item_emb_dim = 32
    time_window_ms = 1000 * 60 * 60 * 1  # 1 hr
    latest_n_emb = 10
    
    li = [action_type_seq, item_embedding_seq, action_time_seq, request_time, item_embedding]
    total_words = list({word for lst in li for string in lst for word in string.split()})
    _, word_embedding, embedding_to_word = embed(total_words)
    emb_dim = 50
    
    action_type_seq = torch.tensor([[word_embedding[word] for word in string.split()] for string in action_type_seq])
    item_embedding_seq = torch.tensor([[word_embedding[word] for word in string.split()] for string in item_embedding_seq])
    action_time_seq =  torch.tensor([[word_embedding[word] for word in string.split()] for string in action_time_seq])
    request_time = torch.tensor([[word_embedding[word] for word in string.split()] for string in request_time])
    item_embedding = torch.tensor([[word_embedding[word] for word in string.split()] for string in item_embedding])
    input_features = (
        action_type_seq,
        item_embedding_seq,
        action_time_seq,
        request_time,
        item_embedding,
    )

    print("Initializing TransAct...")
    transact_config = TransRecConfig(
        action_vocab=action_vocab,
        seq_len=full_seq_len,
        action_emb_dim=action_emb_dim,
        item_emb_dim=item_emb_dim,
        time_window_ms=time_window_ms,
        latest_n_emb=latest_n_emb,
    )

    transact_module = TransRec(transact_config)

    print("Test forward pass")
    output = transact_module(*input_features)
    recommended_keywords = [embedding_to_word[tuple(embedding.tolist())] for embedding in output]
    # print(output)
    print("Test succeeded")
    return recommended_keywords



