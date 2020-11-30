export class User
{
    constructor(name, email, profilePicture, bio, flags, interests)
    {
        this.name = name;
        this.email = email;
        this.profilePicture = profilePicture;
        this.bio = bio;
        this.flags = flags;
        this.interests = interests;
    }
}

export const UserFlags = 
{
    AllOff: 0,
    ShowInterests: 1
}

User.current = null;