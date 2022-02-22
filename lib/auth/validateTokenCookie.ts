import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import { firebaseAdmin } from "./firebaseAdmin";

// Get cookies from Next context
export const validateTokenCookie = async (
  context: GetServerSidePropsContext
) => {
  const cookies = nookies.get(context);
  const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
  const { uid, email } = token;
  return { uid, email };
};
