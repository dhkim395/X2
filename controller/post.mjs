import * as postRepository from "../data/post.mjs";

// 모든 포스트 / 해당 아이디에 대한 포스트를 가져오는 함수
export async function getPosts(req, res, next) {
  const userid = req.query.userid;
  const data = await (userid
    ? postRepository.getAllByUserid(userid)
    : postRepository.getAll());
  res.status(200).json(data);
}

// id를 받아 하나의 포스트를 가져오는 함수
export async function getPost(req, res, next) {
  const id = req.params.id;
  const post = await postRepository.getById(id);
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: `${id}의 포스트가 없습니다.` });
  }
}

// 포스트를 생성하는 함수
export async function createPost(req, res, next) {
  const { text } = req.body;
  const posts = await postRepository.create(text, req.id);
  res.status(201).json(posts);
}

// 포스트를 변경하는 함수
export async function updatePost(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;
  const post = await postRepository.getById(id);
  if (!post) {
    return res.status(404).json({ message: `${id}의 포스트가 없습니다` });
  }
  if (post.userId !== req.id) {
    return res.sendStatus(403);
  }
  const updated = await postRepository.update(id, text);
  res.status(200).json(updated);
}

// 포스트를 삭제하는 함수
export async function deletePost(req, res, next) {
  const id = req.params.id;
  const post = await postRepository.getById(id);
  if (!post) {
    return res.status(404).json({ message: `${id}의 포스트가 없습니다` });
  }
  if (post.userId !== req.id) {
    return res.sendStatus(403);
  }
  await postRepository.remove(id);
  res.sendStatus(204);
}