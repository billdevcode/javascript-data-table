# JavaScript Data Table

This is a challenge to build a data table using vanilla JavaScript (no libraries or frameworks) similar to this one https://www.datatables.net/ but without using jQuery.

### The user stories are:
1. Sorting
2. Pagination
3. Show/hide columns
4. Search
5. Ability to edit/save any of the cells
6. Provide some basic styling, so it looks decent
7. Build logic that will help with performance
    - if dataset is less than or equal to 100 rows then pull data from the client side (stored data)
    - if dataset is greater than 100 then pull via API/service

## Installation

1. Clone the repo - `https://github.com/billdevcode/javascript-data-table.git`
2. Go into the folder - `cd javascript-data-table`
3. Launch the html file - `open index.html`

## Lessons Learned

- There are definitely accomplishments and hurdles while each user story required research, tinkering and creative approaches.
- The one I'm most proud of is the **search** feature.
- If we're dealing with individual table cells then it would have been simple but we're dealing with each row with multiple columns so the early iteration code would only take the last column as the final show or hide condition.
- After some tinkering, ![lightbulb](./assets/lightbulb.png) I thought of using `break` to stop the loop as long as any row's table cell qualifies to be visible.

## License

MIT License
