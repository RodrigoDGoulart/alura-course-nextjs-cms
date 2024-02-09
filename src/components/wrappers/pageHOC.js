import CMSProvider from "../../infra/cms/CMSProvider";

export function PageHOC(Component) {
  return function Wrapper(props) {
    return (
      <CMSProvider cmsContent={props}>
        <Component {...props} />
      </CMSProvider>
    );
  };
}
