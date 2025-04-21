# Using features of React 19

## Intro

- Next.js 15 with React 19
- Remake of remix contacts app
- Quick demo, view edit save
- Not so smooth, using patterns before React 19
- I want to refactor, simplify, and improve the app with React 19

## Server & Client Components: ContactPage

- Remove "use client" from ContactPage, now a server component
- ContactPage: Familiar? Typisk useffect, fetching to our api, many ways to write this, which is a also a problem. No types. Usually you would use a lib (React Query), let's try to survive without that. Loading and error state.
- Make component async "contactPage", add await prisma query and delete useEffect.
- We have alot of states, use suspense for loading state with loading.tsx and error thrown from server with error.tsx (could be errorboundary).
- Hover type:any, now use db  function directly instead of fetch since we are already on the server. Automatic type safety without tRPC etc, hover type contact.
- Replace with getContact function data access layer.
- ContactPage: Comment inn DeleteContactButton, needs browser api and state, get error, add use client! Now we can access the built-in confirm modal.

## Server Functions: DeleteContactButton

- DeleteContactButton: Familiar? bruker fetch without types, just using router.refresh since we don't have any lib here, lets call a function instead of API endpoint. Add deleteContact function, showcase it can do a redirect after mutation.
- Show its failing, legg til "use server" to turn them into endpoints! Works! Automatic serialization and type safety, hover type, show type.
- Remove router.refresh og res.ok, this can throw on its own.
- Back in client-side built-in confirm modal we can call deleteContact on the server like a regular function and delete the contact. Magical.

## (Cache: ContactPage)

- ContactPage: Lets say i want metadata, now I'm fetching twice, showcase console.log. Not for components in this case but same use case.
- Add cache around getContact since it's being used twice per page for metadata
- Showcase console.log

## Actions, form & useFormStatus(): DeleteContactButton, SubmitButton, NewContactButton, layout.tsx

- DeleteContactButton: Manually handling pending state, (and showcase I can't catch errors by adding throw error from function).
- Switch from manual isLoading to a async transition, creating an Action + Server Action, use pending state. Pending state is now perfectly timed with the completion of the Action.
- (Vise error boundary can catch errors since we use action, it didn't work before! Remove thrown error.)

## Form: DeleteContactButton

- DeleteContactButton: Bruk form isteden for bare button, remove pending state. Automatic transition for throwing errors.

## useFormStatus(): SubmitButton, NewContactButton

- SubmitButton: add useFormStatus() to show loading state again
- NewContactButton: Replace with form and bound to a server function directly which creates new contact and redirect. Remove pending state! No need for prevent default.
- No need for use client here, delete NewContactButton, move it to layout. Direkte I en server component.
- Vi er faktisk på serveren her, men SubmitButton med useFormStatus håndterer alt av interaktivitet, composability.
- Making buttons with forms istedenfor on clicks, can run without javascript when calling Server Function directly.

## useActionState(): ContactForm

- ContactForm: Showcase boilerplate code, no type safety, loading states, etc. No form library. Using basic states to return errors and data from server.
- Preventing default, avoiding the web platform.
- Replace states with useActionState() "contactActionState", uses native web formData, and calls a server action, put updateContactAction on form.
- Returned value replaces form errors and data with cmd + d
- Remove step by step all content in onSubmit, then remove onSubmit
- Remove isLoading useState and from submitButton since it uses useFormStatus(), reuse composable component
- Engages the web platform with action and formData, no need to prevent default, native forms
- And again, we can catch and throw errors directly

## useOptimistic(): Favorite

- A naive implementation of optimistic updates, sidebar is updated later
- First lets use some of the stuff we already learned how to use, benefits of Actions and Server Functions, fjern handleFavorite
- Favorite: Use form with action, direct access to a specific server function, automatic serialization and type safety
- Replace useState with useOptimistic, this function only creates a temporary client state, rolls back after transition
- Optimistic updates must be called in transitions
- Automatically Form Server Action wrapped in transition, can call optimistic update inside

## (use(): layout.tsx)

- View delayed page load because fetching in layout
- We have to fetch on the server, but ContactList is a client component
- Add use() to layout.tsx, and wrap with "suspenseSkeleton"

## (Review)

- Clean up and delete unused code
- Delete API layer, we don't like this anyways since it's not type safe
- Fullscreen: Review diffs
- Less boilerplate, cleaner code, no flickering pending states, error boundaries, and loading states. We dont have to use useState and useEffect for everything!
- Everything is type safe by default and automatically serialized
- Additions to our toolkit
- In many cases we can now survive without React Query, tRPC, React Hook Form, but we can also use them if we want to
