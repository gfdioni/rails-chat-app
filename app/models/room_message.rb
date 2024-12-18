class RoomMessage < ApplicationRecord
  belongs_to :user
  belongs_to :room, inverse_of: :room_messages

  def as_json(options = {})
    super(options).merge(user_avatar_url: user.gravatar_url, user_name: user.username)
  end
end
