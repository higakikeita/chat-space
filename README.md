# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
# messagesテーブル
|Column|Type|Options|
|------|----|-------|
| body |text|null:false|
|image |string| 
|group|references|foreign_key:true|
|user|references|foreign_key:true|
### Association
belongs_to :group
belongs_to :user

# users table
|Column|type|Options|
|------|----|-------|
|name|string|index:true,null:false,unique:true|
|mail|string|null:false,unique:true|
### Association
has_many :groups,through: :group_users
has_many :group_users
has_many :massages

# groups table
|Column|Type|Options|
|------|----|-------|
|name|string|index:true,null:false,unique:true|
##Association
has_many:users,through::group_users
has_many:group_users
has_many:masseges

# group_users table
|Column|type|Options|
|------|----|-------|
|group|references|index:true,foreign_key:true,null:false|
|user|references|index:true,foreign_key:true,null:false|
### Association
belongs_to:group
belongs_to:user
