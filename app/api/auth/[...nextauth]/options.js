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
        }),
    ],
}
