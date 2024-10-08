import GitHubProviders from "next-auth/providers/github";
import GoogleProviders from "next-auth/providers/google";

export const options = {
    providers :[
        GitHubProviders({
            profile(profile){
                console.log("GitHub Profile " , profile);

                const userRole = "GitHub User";
                if (profile?.email == "fitsumtafese01@gmail.com"){
                    userRole = "admin"
                }
                return{
                    ...profile,
                    role :userRole,
                };
            },
            clientId:process.env.GITHUB_ID,
            clientSecret:process.env.GITHUB_Secret,
        }),
        GoogleProviders({
            profile(profile){
                console.log("Google Profile " , profile);

                return{
                    ...profile,
                    id:profile.sub,
                    role :userRole,
                };
            },
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_Secret,
        }),
    ],

    callbacks :{
        async jwt ({token , user}){
            if(user) token.role = user.role;
            return token;
        },
        async session({ session,token }){
            if(session?.user) session.user.role = token.role;
            return session;
        }
    }
}
