/** ---------- BASE TABLES + DATA, NO DEPENDENCIES ---------- **/

-- Use w/ components: login, registration, user
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "email" VARCHAR,
    "profile_img" NUMERIC,
    "account_created" timestamp without time zone
);

-- Details for all points of interest
-- Use w/ components: allPoints, routeDetail
CREATE TABLE "poi_details" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR,
    "image_url" VARCHAR,
    "street_address" VARCHAR,
    "latitude" NUMERIC,
    "longitude" NUMERIC,
    "short_desc" VARCHAR,
    "description" VARCHAR,
    "sources_cited" VARCHAR
);

    -- Dummy data:
    INSERT INTO "poi_details"
    ("name","image_url","street_address","longitude","latitude","short_desc","description")
    VALUES
    ('St. Paul Union Depot','https://www.uniondepot.org/wp-content/uploads/2020/01/OutsideFrontHero1lowres-scaled.jpg','214 4TH STREET EAST, ST PAUL MN 55101', -93.08614014373347, 44.94743766037045,
    'The first Union Depot was built near the river in 1881. After a second fire destroyed the station, the design for the grand neo-classical building standing today was commissioned in 1913. The railroads, the post office and Saint Paul Union Depot Co. offered opportunities for jobs and travel from this historic neighborhood.', 
    'The first Union Depot was built near the river in 1881. After a second fire destroyed the station, the design for the grand neo-classical building standing today was commissioned in 1913. The railroads, the post office and Saint Paul Union Depot Co. offered opportunities for jobs and travel from this historic neighborhood.
    The last passenger train (Burlington’s Afternoon Zephyr) serving Union Depot in the 20th century departed on April 30, 1971. The building never stood empty and its use as a passenger station was never far from peoples’ hearts and minds.
    Ramsey County Regional Railroad Authority bought Union Depot and began a massive two-year restoration of the 33-acre property in 2011.');

-- Data for transit routes
-- Use w/ components: allRoutes, routeDetail
CREATE TABLE "gtfs_routes" (
    "id" NUMERIC PRIMARY KEY,
    "route_long_name" VARCHAR,
    "route_short_name" VARCHAR,
    "route_name" VARCHAR,
    "route_desc" VARCHAR,
    "route_url" VARCHAR,
    "route_color" VARCHAR,
    "route_text_color" VARCHAR,
    "agency_id" NUMERIC,
    "route_type" NUMERIC,
    "route_sort_order" NUMERIC
);

    -- Dummy data; green line:
    INSERT INTO "gtfs_routes" 
    ("id", "route_short_name", "route_name", "route_desc", "route_url", "route_color", "route_text_color",  "agency_id", "route_type", "route_sort_order")
    VALUES
    (902, 'METRO Green Line', null, 'METRO Green Line', 'Green Line - Mpls - St Paul', 'https://www.metrotransit.org/route/green', '008144', 'ffffff', 0, 0, 3)
    
    -- Reduce name columns
    UPDATE "gtfs_routes"
        SET "route_name"="route_short_name"
        WHERE "route_short_name" IS NOT NULL;
        
    UPDATE "gtfs_routes"
        SET "route_name"="route_long_name"
        WHERE "route_long_name" IS NOT NULL;


/** ---------- TABLES W/ DEPENDENCIES ---------- **/
-- Sources for details
-- Use w/ components: allPoints
CREATE TABLE "poi_sources" (
    "id" SERIAL PRIMARY KEY,
    "url" VARCHAR,
    "poi_id" INTEGER REFERENCES "poi_details"
);

    -- Dummy data
    INSERT INTO "poi_sources" ("url", "poi_id")
        VALUES
        ('https://www.mnopedia.org/structure/st-paul-union-depot', 1),
        ('https://www.uniondepot.org/', 1);

    -- Update table w/ array of source URLs
    UPDATE "poi_details" 
    SET "sources_cited" = 
        (SELECT 
            JSON_AGG("poi_sources"."url") AS "sources_cited"
            FROM "poi_sources"
            GROUP BY "poi_id")
    FROM "poi_sources"
    WHERE "poi_details"."id" = "poi_sources"."poi_id";

-- Track points of interest a user saves
-- Use w/ components: popularPoints
CREATE TABLE "poi_saves" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user",
    "poi_id" INTEGER REFERENCES "poi_details"
);

-- Track trips a user has marked complete
-- Use w/ components: popularPoints, routeDetail
CREATE TABLE "trips_completed" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user",
    "route_id" INTEGER REFERENCES "gtfs_routes",
    "completed_on" DATE
);

-- Tie POIs and routes together
-- Use w/ components: routeDetail
CREATE TABLE poi_routes (
    PRIMARY KEY ("poi_id", "route_id"),
    "poi_id" INTEGER NOT NULL REFERENCES "poi_details",
    "route_id" INTEGER NOT NULL REFERENCES "gtfs_routes",
    "poi_order_num" INTEGER
);
    -- Dummy data, only one Point of Interest
    INSERT INTO "poi_routes" ("poi_id", "route_id", "poi_order_num")
    VALUES (1, 902, 1);

-- Trip data
-- Use w/ components: 
CREATE TABLE "gtfs_trips" (
    "id" SERIAL PRIMARY KEY,
    "route_id" NUMERIC REFERENCES "gtfs_routes",
    "quarter" VARCHAR,
    "service_id" VARCHAR,
    "trip_id" VARCHAR,
    "trip_id_long" VARCHAR,
    "schedule" VARCHAR,
    "trip_headsign" VARCHAR,
    "direction_id" NUMERIC,
    "direction" VARCHAR,
    "block_id" NUMERIC,
    "shape_id" NUMERIC,
    "wheelchair_accessible" VARCHAR,
    "branch_letter" VARCHAR,
    "boarding_type" VARCHAR
);

-- Route path coordinates for polyline on map
-- Use w/ components: polyline
CREATE TABLE "gtfs_shapes" (
    "shape_id" NUMERIC,
    "route_id" NUMERIC REFERENCES "gtfs_routes",
    "shape_pt_lat" NUMERIC,
    "shape_pt_lon" NUMERIC,
    "shape_pt_sequence" NUMERIC,
    "shape_dist_traveled" NUMERIC,
    "id" SERIAL PRIMARY KEY
);
    -- Updates route id field
    UPDATE "gtfs_shapes"
        SET "route_id"= "gtfs_trips"."route_id"
        FROM "gtfs_trips"
        WHERE "gtfs_shapes"."shape_id"="gtfs_trips"."shape_id";