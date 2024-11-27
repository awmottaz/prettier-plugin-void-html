# Release procedure

This procedure list is inspired by [Eleventy's release instructions](https://github.com/11ty/eleventy/blob/c901131cd15d3a65531f25a9804cc9246199649e/docs/release-instructions.md).

1. Create a new release branch. The `main` branch should already contain all changes to be included in the release.

   ```sh
   git s main
   git pull
   # Replace X, Y, and Z with the correct numbers for
   # the version about to be released.
   git s -c release/vX.Y.Z
   ```

2. Check that dependencies are up to date.

   ```sh
   npm outdated
   ```

   > [!TIP]
   > All of the `prettier-<version>` dependencies will show up as outdated. This is expected.

3. Make sure the lockfile is fresh.

   ```sh
   rm -rf node_modules
   rm -f package-lock.json
   npm install
   ```

4. Run an audit and fix issues.

   ```sh
   npm audit
   ```

5. Make sure `npm run lint` runs okay.
6. Make sure `npm run test` runs okay.
7. Update `version` in package.json.
8. Check in all changes and commit.
9. Tag the new version

   ```sh
   git tag vX.Y.Z
   ```

10. Push release branch to GitHub and create a PR to `main`. Make sure to also push tags.

    ```sh
    git push --tags -u origin <branch-name>
    ```

11. Make sure the PR checks run successfully.
12. Publish to NPM

    ```sh
    npm publish
    ```

13. Create a GitHub release from the new tag. Use the shortlog as a starting point for release notes.

    ```sh
    git shortlog <previous-version>..HEAD
    ```

14. On this branch, update the changelog by copy-pasting the release description from GitHub. Commit and push the changes.
15. Merge the PR.
