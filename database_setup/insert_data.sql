INSERT INTO `user_type` (`id`, `type_name`) VALUES (NULL, 'admin');
INSERT INTO `user_type` (`id`, `type_name`) VALUES (NULL, 'employe');
INSERT INTO `user_type` (`id`, `type_name`) VALUES (NULL, 'clienc');
INSERT INTO `user_type` (`id`, `type_name`) VALUES (NULL, 'visitor');

INSERT INTO `application_name` (`id`, `app_name`) VALUES (NULL, 'Keyword App');
INSERT INTO `application_name` (`id`, `app_name`) VALUES (NULL, 'CMP');
INSERT INTO `application_name` (`id`, `app_name`) VALUES (NULL, 'Partner Portal');
INSERT INTO `application_name` (`id`, `app_name`) VALUES (NULL, 'Custom DSP');
INSERT INTO `application_name` (`id`, `app_name`) VALUES (NULL, 'Mobile Apps');

INSERT INTO `user` (`id`, `username`, `password`, `type_id`) VALUES (NULL, 'admin', 'admin', '1');