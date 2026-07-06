const Post = require('../models/postModels');

exports.getPosts = async (req, res) => {
  const { page } = req.query;
  const postsPerPage = 10;

  try {
    const pageNum = Number(page) || 1;
    if (page <= 1) {
      pageNum = 0;
    } else {
      pageNum = page - 1;
    }

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(pageNum * postsPerPage)
      .limit(postsPerPage)
      .populate({
        model: 'User',
        select: 'email',
      });
    res
      .status(200)
      .json({
        success: true,
        message: 'posts fetched successfully',
        data: posts,
      });
  } catch (error) {
    console.log(error);
  }
};
exports.singlePost = async (req, res) => {
  const { _id } = req.query;

  try {
    const result = await Post.findOne({ _id }).populate({
      model: 'User',
      select: 'email',
      path: 'userId',
    });
    res
      .status(200)
      .json({ success: true, message: 'single post', data: result });
  } catch (error) {
    console.log(error);
  }
};

exports.createPost = async (req, res) => {
  const { title, description } = req.body;
  const { userId } = req.user;
  try {
    const { error, value } = createPostSchema.validate({
      title,
      description,
      userId,
    });
    if (error) {
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message });
    }

    const result = await Post.create({
      title,
      description,
      userId,
    });
    res
      .status(201)
      .json({ success: true, message: 'post created', data: result });
  } catch (error) {
    console.log(error);
  }
};
exports.updatePost = async (req, res) => {
  const { _id } = req.query;
  const { title, description } = req.body;
  const { userId } = req.user;
  try {
    const { error, value } = createPostSchema.validate({
      title,
      description,
      userId,
    });
    if (error) {
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message });
    }
    const existingPost = await Post.findOne({ _id });
    if (!existingPost) {
      return res
        .status(404)
        .json({ success: false, message: 'Post not available' });
    }
    if (existingPost.userId.toString() !== userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    existingPost.title = title;
    existingPost.description = description;
    const result = await existingPost.save();
    res
      .status(201)
      .json({ success: true, message: 'post updated', data: result });
  } catch (error) {
    console.log(error);
  }
};
exports.deletePost = async (req, res) => {
  const { _id } = req.query;
  const { userId } = req.user;
  try {
    const existingPost = await Post.findOne({ _id });
    if (!existingPost) {
      return res
        .status(404)
        .json({ success: false, message: 'Post already available' });
    }
    if (existingPost.userId.toString() !== userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    await Post.deleteOne({ _id });
    res.status(201).json({ success: true, message: 'post deleted' });
  } catch (error) {
    console.log(error);
  }
};
