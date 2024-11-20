class UsersController < ApplicationController
  skip_before_action :check_username

  def index
    render "users/username"
  end

  def createGuest
    @userName = params[:guestUser][:username]
    puts @userName
    if userData = User.where(username: @userName).first
      @guestUser = userData
    else
      @guestUser = User.new(username: @userName, email: "guest_#{Time.now.to_i}#{rand(100)}@example.com", guest: true)
      if @guestUser.save!(validate: false)
      end
    end

    session[:guest_user_id] = @guestUser.id
    cookies.signed["user.id"] = @guestUser.id
    redirect_to rooms_path
  end
end
