import NavProvider from "./Provider";
import NavHeader from "./Header";
import NavBrand from "./Brand";
import NavLinksRail from "./LinksRail";
import NavLinksStack from "./LinksStack";
import NavAction from "./Action";
import NavMobileToggle from "./MobileToggle";
import NavMobileSheet from "./MobileSheet";

/**
 * The Nav compound. Mount Provider once and compose the parts you need.
 *
 * Per composition-patterns:
 *   - architecture-compound-components: shared state via context
 *   - architecture-avoid-boolean-props: no `variant` flags anywhere
 *   - patterns-explicit-variants: LinksRail vs LinksStack are explicit
 *
 * @example
 *   <Nav.Provider>
 *     <Nav.Header>
 *       <Nav.Brand />
 *       <Nav.LinksRail links={LINKS} />
 *       <Nav.Action><Booking.QuietTrigger /></Nav.Action>
 *       <Nav.MobileToggle />
 *     </Nav.Header>
 *     <Nav.MobileSheet>
 *       <Nav.LinksStack links={LINKS} />
 *       <Booking.MobileTrigger />
 *     </Nav.MobileSheet>
 *   </Nav.Provider>
 */
export const Nav = {
  Provider: NavProvider,
  Header: NavHeader,
  Brand: NavBrand,
  LinksRail: NavLinksRail,
  LinksStack: NavLinksStack,
  Action: NavAction,
  MobileToggle: NavMobileToggle,
  MobileSheet: NavMobileSheet,
};

export { useNav } from "./context";
export type { NavContextValue } from "./context";
export type { NavLink } from "./LinksRail";
