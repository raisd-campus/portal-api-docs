# Performance behaviour

The dashboard Performance section presents academic results supplied by the logical Portal API. It does not calculate or certify GPA or CGPA.

## Data and selection

- GPA and CGPA are separate values on each `StudentSemesterPerformance` record.
- The initially selected result matches the active Semester when available, otherwise the latest returned result is selected.
- Selecting a completed semester updates both chart values and both highlighted points.
- Every semester comes from Programme `totalSemesterCount`, so the chart displays the full programme timeline. The current fixture contains six programme semesters; semesters without a result remain visible but disabled until a result exists.
- Records are ordered by semester number. Missing semesters break the line so the chart does not imply an unreported result.

## Chart behaviour

- Recharts provides the chart layout and SVG primitives; portal semantic tokens and typography utilities own its visual styling.
- Rising segments are positive green, falling segments are negative red, and unchanged segments are neutral gray.
- The first point adopts the direction of its first connected segment. A standalone point is neutral.
- Each metric has its own zero-based vertical scale. The minimum ceiling is 4.0, but the scale expands to a readable rounded ceiling for larger API values.
- Each semester keeps a readable minimum width. Longer programmes use native horizontal scrolling with the portal's global scrollbar.
- Point values are hidden until the user hovers the chart. The token-styled tooltip identifies the semester and metric and formats the value to two decimal places; axis labels use one decimal place. The selected semester heading and active x-axis semester label use the shared high-emphasis `title` text colour, and chart labels use the 12px typography floor.
- The Recharts implementation is a deferred production chunk. The section keeps its heading and reserves the two-card layout with matching skeletons until it comes within 400px of the viewport; environments without `IntersectionObserver` load the charts immediately.
- Responsive chart measurement is debounced by 100ms so sidebar width transitions do not force a chart render on every resize observation.

## Current scope

The feature is rendered below Modules on the dashboard and reused by the completed Academic Performance route. No database, live API, authentication, persistence, or mobile layout is introduced.
