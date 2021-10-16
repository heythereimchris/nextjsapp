import { Route, Switch, RootPage } from "../components/NextQueryTransitions";
import { useRouter } from "next/router";

export default function IndexPage() {
  const router = useRouter();
  return (
    <div className="page">
      <RootPage animation={router.query.action !== undefined}>
        <div className="page hello">
          <div>
            <p>Hello World.</p>

            <p>
              <button
                onClick={() => {
                  let query = { ...router.query, action: "about" };
                  router.push({ query }, undefined, {
                    shallow: true
                  });
                }}
              >
                Go to About
              </button>
            </p>
          </div>
        </div>
      </RootPage>

      <Switch condition={router.query.action} fallback={null}>
        <Route path={"about"}>
          <div className="page about">
            <div>
              <p>Hello World.</p>
              <p>
                <button
                  onClick={() => {
                    router.push({}, undefined, {
                      shallow: true
                    });
                  }}
                >
                  Go to Index
                </button>
              </p>
            </div>
          </div>
        </Route>
      </Switch>
    </div>
  );
}
