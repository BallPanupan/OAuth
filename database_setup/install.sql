CREATE DATABASE oauth;

CREATE TABLE `oauth`.`user_type` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `type_name` TEXT NOT NULL ,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;


CREATE TABLE `oauth`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `username` TEXT NOT NULL ,
  `password` TEXT NOT NULL ,
  `type_id` INT NOT NULL ,
  `accessToken` TEXT NOT NULL ,
  `refreshToken` TEXT NOT NULL ,
  `first_name` TEXT NOT NULL ,
  `last_name` TEXT NOT NULL ,
  `email` TEXT NOT NULL ,
  `email_verified_at` TEXT NOT NULL ,
  `status` TEXT NOT NULL ,
  `avatar` TEXT NOT NULL ,
  `role_id` TEXT NOT NULL ,
  `created_at` TEXT NOT NULL ,
  `updated_at` TEXT NOT NULL ,
  PRIMARY KEY (`id`),
  FOREIGN KEY (type_id) REFERENCES user_type(id)
) ENGINE = InnoDB;



CREATE TABLE `oauth`.`application_name` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `app_name` TEXT NOT NULL ,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE `oauth`.`permisstion` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL ,
  `application_name` INT NOT NULL ,
  `app_read` BOOLEAN NOT NULL,
  `app_write` BOOLEAN NOT NULL,
  `app_edit` BOOLEAN NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (application_name) REFERENCES application_name(id)
) ENGINE = InnoDB;

CREATE TABLE `oauth`.`token` (
  `id` INT NOT NULL AUTO_INCREMENT , 
  `user_id` INT NOT NULL ,
  `refreshToken` TEXT NOT NULL , 
  PRIMARY KEY (`id`),
  FOREIGN KEY (user_id) REFERENCES user(id)
) ENGINE = InnoDB;