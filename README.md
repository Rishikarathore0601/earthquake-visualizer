# Earthquake Visualizer 🌍

This React-based Earthquake Visualizer app displays recent earthquakes on an interactive map using the Leaflet library. Users can click on specific earthquake markers to view recent history of earthquakes within a 500 km radius. The app retrieves real-time data from the USGS Earthquake API.

## Features

- **Interactive Map**: Displays earthquake locations globally with markers.
- **Recent Earthquake Data**: Fetches recent earthquake data from the USGS API.
- **Click for Earthquake History**: Click on a marker to view recent history (up to six events) for that location within a 500 km radius.
- **Responsive Sidebar**: Shows earthquake history in a sidebar on the right when a marker is selected.
- **Styled with CSS**: Beautiful and responsive design using custom CSS.

## Technologies Used

- **React**: Front-end library for building user interfaces.
- **Leaflet**: Open-source JavaScript library for interactive maps.
- **React Leaflet**: Integration of Leaflet into React.
- **USGS Earthquake API**: Fetches real-time earthquake data.


## Setup Instructions

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/earthquake-visualizer.git
    cd earthquake-visualizer
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

4. Open your browser and navigate to:
    ```
    http://localhost:5173
    ```

## Usage

- The app loads a world map with markers indicating recent earthquakes.
- Click on any marker to view details about the selected earthquake.
- When a marker is clicked, a sidebar appears on the right, showing up to six recent earthquakes within a 500 km radius of the selected earthquake.

## API Reference

This app uses the **USGS Earthquake API**:
- [All Earthquakes in the Past Day](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson)
- **History API**: Fetches recent earthquakes within a radius by coordinates and date range.

## Customization

- You can adjust the radius for historical earthquake searches by changing the `radiusKm` variable in `App.jsx`.
- Modify the number of historical events shown in the sidebar by adjusting the `slice` parameter in the `fetchHistory` function.

## Deployed link

- https://earthquake-visualize.netlify.app/


## Future Improvements

- **Search by Location**: Add a feature to search for earthquakes by entering a location.
- **Filter by Magnitude**: Allow users to filter earthquakes by magnitude.
- **Improved Styling**: Add more detailed styles and animations.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Acknowledgments

- **USGS Earthquake API**: For providing real-time earthquake data.
- **Leaflet**: For interactive map features.

---

**Happy Coding! 🌏**


