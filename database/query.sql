SELECT * 
FROM ((oauth.user as user 
  INNER JOIN oauth.user_type as user_type ON user.id = user_type.id
  INNER JOIN oauth.permisstion as permisstion on user.id = permisstion.id
  INNER JOIN oauth.application_name as application_name on permisstion.application_name = application_name.id
 ))
