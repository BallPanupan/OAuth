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
