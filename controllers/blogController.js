exports.blog_index = (req, res) => {
  res.json({
    'status': true,
    'result': "this is a index page of /blog/"
  })
}

exports.blog_details = (req, res) => {
  const id = req.params.id;
  res.json({
    'status': true,
    'result': `this is a index page of /blog/${id}`
  })
}

const blog_create_post = (req, res) => {
  console.log('xxxx')
  console.log(req.body);
}

module.exports = {
  blog_create_post 
}