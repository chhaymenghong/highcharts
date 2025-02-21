/* *
 *
 *  (c) 2010-2018 Grzegorz Blachlinski, Sebastian Bochan
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

'use strict';

import H from '../parts/Globals.js';

/**
 * Internal types
 * @private
 */
declare global {
    namespace Highcharts {
        type PackedBubbleData = [
            (number|null),
            (number|null),
            (number|null),
            number,
            number,
            PackedBubblePointOptions
        ];
        interface NetworkgraphLayout {
            beforeStep?(): void;
        }
        interface NetworkgraphPackedBubbleIntegrationObject
            extends NetworkgraphIntegrationObject
        {
            barycenter(): void;
            getK: Function;
            integrate: NetworkgraphVerletIntegrationObject['integrate'];
            repulsive(
                node: PackedBubblePoint,
                force: number,
                distanceXY: Dictionary<number>,
                repNode: PackedBubblePoint
            ): void;
            repulsiveForceFunction(
                d: number,
                k: number,
                node: PackedBubblePoint,
                repNode: PackedBubblePoint
            ): number;
        }
        interface PackedBubbleChart extends NetworkgraphChart {
            allDataPoints: Array<PackedBubbleData>;
            diffX: number;
            diffY: number;
            hoverPoint: PackedBubblePoint;
            maxRadius: number;
            minRadius: number;
            rawPositions: Array<Array<number>>;
            stages: Array<Array<(number|object|null)>>;
        }
        interface PackedBubbleDataLabelsFormatterCallbackFunction {
            (this: (
                DataLabelsFormatterContextObject|
                PackedBubbleDataLabelsFormatterContextObject
            )): (number|string|null|undefined);
        }
        interface PackedBubbleDataLabelsFormatterContextObject
            extends DataLabelsFormatterContextObject
        {
            point: PackedBubblePoint;
        }
        interface PackedBubbleDataLabelsOptionsObject
            extends DataLabelsOptionsObject
        {
            format?: string;
            formatter?: PackedBubbleDataLabelsFormatterCallbackFunction;
            parentNodeFormat?: string;
            parentNodeFormatter?: (
                PackedBubbleDataLabelsFormatterCallbackFunction
            );
            parentNodeTextPath?: DataLabelsTextPathOptionsObject;
            textPath?: DataLabelsTextPathOptionsObject;
        }
        interface PackedBubbleLayout extends NetworkgraphLayout {
            enableSimulation: (
                PackedBubbleLayoutAlgorithmOptions['enableSimulation']
            );
            nodes: Array<PackedBubblePoint>;
            options: PackedBubbleLayoutAlgorithmOptions;
            series: Array<PackedBubbleSeries>;
        }
        interface PackedBubbleLayoutAlgorithmOptions
            extends NetworkgraphLayoutAlgorithmOptions
        {
            bubblePadding?: number;
            dragBetweenSeries?: boolean;
            enableSimulation?: boolean;
            friction?: number;
            gravitationalConstant?: number;
            initialPositionRadius?: number;
            marker?: PackedBubbleSeriesOptions['marker'];
            maxIterations?: number;
            maxSpeed?: number;
            parentNodeLimit?: boolean;
            parentNodeOptions?: PackedBubbleLayoutAlgorithmOptions;
            seriesInteraction?: boolean;
            splitSeries?: boolean;
        }
        interface PackedBubblePointOptions extends BubblePointOptions {
            mass?: number;
        }
        interface PackedBubbleSeriesOptions extends BubbleSeriesOptions {
            dataLabels?: PackedBubbleDataLabelsOptionsObject;
            draggable?: boolean;
            layoutAlgorithm?: PackedBubbleLayoutAlgorithmOptions;
            useSimulation?: boolean;
        }
        interface Point {
            degree?: number;
        }
        interface SeriesTypesDictionary {
            packedbubble: typeof PackedBubbleSeries;
        }
        class PackedBubblePoint extends BubblePoint implements DragNodesPoint {
            public collisionNmb?: number;
            public dataLabelOnNull?: boolean;
            public degree: number;
            public dispX?: number;
            public dispY?: number;
            public fixedPosition: DragNodesPoint['fixedPosition'];
            public isParentNode?: boolean;
            public mass: number;
            public neighbours?: number;
            public options: PackedBubblePointOptions;
            public prevX?: number;
            public prevY?: number;
            public radius: number;
            public removed?: any; // @todo
            public series: PackedBubbleSeries;
            public seriesIndex?: number;
            public value: (number|null);
        }
        class PackedBubbleSeries extends BubbleSeries
            implements DragNodesSeries {
            public chart: PackedBubbleChart;
            public data: Array<PackedBubblePoint>;
            public forces: Array<string>;
            public hasDraggableNodes: boolean;
            public hoverPoint: PackedBubblePoint;
            public index: number;
            public isCartesian: boolean;
            public layout: PackedBubbleLayout;
            public noSharedTooltip: boolean;
            public onMouseDown: DragNodesMixin['onMouseDown'];
            public onMouseMove: DragNodesMixin['onMouseMove'];
            public options: PackedBubbleSeriesOptions;
            public parentNode?: PackedBubblePoint;
            public parentNodesGroup?: SVGElement;
            public parentNodeLayout: PackedBubbleLayout;
            public parentNodeMass?: number;
            public parentNodeRadius?: number;
            public pointArrayMap: Array<string>;
            public pointClass: typeof PackedBubblePoint;
            public points: Array<PackedBubblePoint>;
            public pointValKey: string;
            public redrawHalo: DragNodesMixin['redrawHalo'];
            public xData: Array<number>;
            public checkOverlap(
                bubble1: Array<number>,
                bubble2: Array<number>
            ): boolean;
            public accumulateAllPoints(
                series: PackedBubbleSeries
            ): Array<PackedBubbleData>;
            public addLayout(): void;
            public addSeriesLayout(): void;
            public calculateParentRadius(): void;
            public calculateZExtremes(): Array<number>;
            public createParentNodes(): void;
            public deferLayout(): void;
            public destroy(): void;
            public drawDataLabels(): void;
            public drawGraph(): void;
            public getPointRadius(): void;
            public init(): PackedBubbleSeries;
            public onMouseUp(point: DragNodesPoint): void;
            public placeBubbles(
                allDataPoints: Array<PackedBubbleData>
            ): Array<PackedBubbleData>;
            public positionBubble(
                lastBubble: Array<number>,
                newOrigin: Array<number>,
                nextBubble: Array<number>
            ): Array<number>;
            public render(): void;
            public resizeRadius(): void;
            public seriesBox(): (Array<number>|null);
            public setVisible(): void;
            public translate(): void;
        }
    }
}

/**
 * Formatter callback function.
 *
 * @callback Highcharts.SeriesPackedBubbleDataLabelsFormatterCallbackFunction
 *
 * @param {Highcharts.SeriesPackedBubbleDataLabelsFormatterContextObject|Highcharts.DataLabelsFormatterContextObject} this
 *        Data label context to format
 *
 * @return {string}
 *         Formatted data label text
 */

/**
 * Context for the formatter function.
 *
 * @interface Highcharts.SeriesPackedBubbleDataLabelsFormatterContextObject
 * @extends Highcharts.DataLabelsFormatterContextObject
 * @since 7.0.0
 *//**
 * The color of the node.
 * @name Highcharts.SeriesPackedBubbleDataLabelsFormatterContextObject#color
 * @type {Highcharts.ColorString}
 * @since 7.0.0
 *//**
 * The point (node) object. The node name, if defined, is available through
 * `this.point.name`. Arrays: `this.point.linksFrom` and `this.point.linksTo`
 * contains all nodes connected to this point.
 * @name Highcharts.SeriesPackedBubbleDataLabelsFormatterContextObject#point
 * @type {Highcharts.Point}
 * @since 7.0.0
 *//**
 * The ID of the node.
 * @name Highcharts.SeriesPackedBubbleDataLabelsFormatterContextObject#key
 * @type {string}
 * @since 7.0.0
 */

/**
 * Data labels options
 *
 * @interface Highcharts.SeriesPackedBubbleDataLabelsOptionsObject
 * @extends Highcharts.DataLabelsOptionsObject
 * @since 7.0.0
 *//**
 * The
 * [format string](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting)
 * specifying what to show for _node_ in the networkgraph. In v7.0 defaults to
 * `{key}`, since v7.1 defaults to `undefined` and `formatter` is used instead.
 * @name Highcharts.SeriesPackedBubbleDataLabelsOptionsObject#format
 * @type {string|undefined}
 * @since 7.0.0
 *//**
 * Callback JavaScript function to format the data label for a node. Note that
 * if a `format` is defined, the format takes precedence and the formatter is
 * ignored.
 * @name Highcharts.SeriesPackedBubbleDataLabelsOptionsObject#formatter
 * @type {Highcharts.SeriesPackedBubbleDataLabelsFormatterCallbackFunction|undefined}
 * @since 7.0.0
 *//**
 * @name Highcharts.SeriesPackedBubbleDataLabelsOptionsObject#parentNodeFormat
 * @type {string|undefined}
 * @since 7.1.0
 *//**
 * Callback to format data labels for _parentNodes_. The `parentNodeFormat`
 * option takes precedence over the `parentNodeFormatter`.
 * @name Highcharts.SeriesPackedBubbleDataLabelsOptionsObject#parentNodeFormatter
 * @type {Highcharts.FormatterCallbackFunction<Highcharts.DataLabelsFormatterContextObject>|undefined}
 * @since 7.1.0
 *//**
 * Options for a _parentNode_ label text.
 * @sample highcharts/series-packedbubble/packed-dashboard
 *         Dashboard with dataLabels on parentNodes
 * @name Highcharts.SeriesPackedBubbleDataLabelsOptionsObject#parentNodeTextPath
 * @type {Highcharts.SeriesPackedBubbleDataLabelsTextPathOptionsObject|undefined}
 * @since 7.1.0
 *//**
 * Options for a _node_ label text which should follow marker's shape.
 * **Note:** Only SVG-based renderer supports this option.
 * @see {@link Highcharts.SeriesPackedBubbleDataLabelsTextPath#linkTextPath}
 * @name Highcharts.SeriesPackedBubbleDataLabelsOptionsObject#textPath
 * @type {Highcharts.SeriesPackedBubbleDataLabelsTextPathOptionsObject|undefined}
 * @since 7.1.0
 */

/**
 * **Note:** Only SVG-based renderer supports this option.
 *
 * @see {@link Highcharts.SeriesNetworkDataLabelsTextPath#linkTextPath}
 * @see {@link Highcharts.SeriesNetworkDataLabelsTextPath#textPath}
 *
 * @interface Highcharts.SeriesPackedBubbleDataLabelsTextPathOptionsObject
 * @since 7.1.0
 *//**
 * Presentation attributes for the text path.
 * @name Highcharts.SeriesPackedBubbleDataLabelsTextPathOptionsObject#attributes
 * @type {Highcharts.SVGAttributes|undefined}
 * @since 7.1.0
 *//**
 * Enable or disable `textPath` option for link's or marker's data labels.
 * @name Highcharts.SeriesPackedBubbleDataLabelsTextPathOptionsObject#enabled
 * @type {boolean|undefined}
 * @since 7.1.0
 */

import U from '../parts/Utilities.js';
var defined = U.defined,
    isArray = U.isArray,
    isNumber = U.isNumber;

import '../parts/Axis.js';
import '../parts/Color.js';
import '../parts/Point.js';
import '../parts/Series.js';
import '../modules/networkgraph/layouts.js';
import '../modules/networkgraph/draggable-nodes.js';


var seriesType = H.seriesType,
    Series = H.Series,
    Point = H.Point,
    pick = H.pick,
    addEvent = H.addEvent,
    Chart = H.Chart,
    color = H.Color,
    Reingold = H.layouts['reingold-fruchterman'],
    NetworkPoint = H.seriesTypes.bubble.prototype.pointClass,
    dragNodesMixin = H.dragNodesMixin;


(H.networkgraphIntegrations as any).packedbubble = {
    repulsiveForceFunction: function (
        d: number,
        k: number,
        node: Highcharts.PackedBubblePoint,
        repNode: Highcharts.PackedBubblePoint
    ): number {
        return Math.min(
            d,
            ((node.marker as any).radius + (repNode.marker as any).radius) / 2
        );
    },
    barycenter: function (this: Highcharts.PackedBubbleLayout): void {
        var layout = this,
            gravitationalConstant = layout.options.gravitationalConstant,
            box = layout.box,
            nodes = layout.nodes,
            centerX,
            centerY;

        nodes.forEach(function (node: Highcharts.PackedBubblePoint): void {
            if (layout.options.splitSeries && !node.isParentNode) {
                centerX = (node.series.parentNode as any).plotX;
                centerY = (node.series.parentNode as any).plotY;
            } else {
                centerX = box.width / 2;
                centerY = box.height / 2;
            }
            if (!node.fixedPosition) {
                (node.plotX as any) -=
                    ((node.plotX as any) - (centerX as any)) *
                    (gravitationalConstant as any) /
                    (node.mass * Math.sqrt(nodes.length));

                (node.plotY as any) -=
                    ((node.plotY as any) - (centerY as any)) *
                    (gravitationalConstant as any) /
                    (node.mass * Math.sqrt(nodes.length));
            }
        });
    },

    repulsive: function (
        this: Highcharts.PackedBubbleLayout,
        node: Highcharts.PackedBubblePoint,
        force: number,
        distanceXY: Highcharts.Dictionary<number>,
        repNode: Highcharts.PackedBubblePoint
    ): void {
        var factor = (
                force * (this.diffTemperature as any) / (node.mass as any) /
                (node.degree as any)
            ),
            x = distanceXY.x * factor,
            y = distanceXY.y * factor;

        if (!node.fixedPosition) {
            (node.plotX as any) += x;
            (node.plotY as any) += y;
        }
        if (!repNode.fixedPosition) {
            (repNode.plotX as any) -= x;
            (repNode.plotY as any) -= y;
        }
    },
    integrate: H.networkgraphIntegrations.verlet.integrate,
    getK: H.noop
};

H.layouts.packedbubble = H.extendClass(
    Reingold,
    {
        beforeStep: function (this: Highcharts.PackedBubbleLayout): void {
            if (this.options.marker) {
                this.series.forEach(function (
                    series: Highcharts.PackedBubbleSeries
                ): void {
                    if (series) {
                        series.calculateParentRadius();
                    }
                });
            }
        },
        setCircularPositions: function (
            this: Highcharts.PackedBubbleLayout
        ): void {
            var layout = this,
                box = layout.box,
                nodes = layout.nodes,
                nodesLength = nodes.length + 1,
                angle = 2 * Math.PI / nodesLength,
                centerX,
                centerY,
                radius = layout.options.initialPositionRadius;
            nodes.forEach(function (
                node: Highcharts.PackedBubblePoint,
                index: number
            ): void {
                if (
                    layout.options.splitSeries &&
                    !node.isParentNode
                ) {
                    centerX = (node.series.parentNode as any).plotX;
                    centerY = (node.series.parentNode as any).plotY;
                } else {
                    centerX = box.width / 2;
                    centerY = box.height / 2;
                }

                node.plotX = node.prevX = pick(
                    node.plotX,
                    (centerX as any) +
                    (radius as any) * Math.cos(node.index || index * angle)
                );

                node.plotY = node.prevY = pick(
                    node.plotY,
                    (centerY as any) +
                    (radius as any) * Math.sin(node.index || index * angle)
                );

                node.dispX = 0;
                node.dispY = 0;
            });
        },
        repulsiveForces: function (this: Highcharts.PackedBubbleLayout): void {
            var layout = this,
                force,
                distanceR,
                distanceXY,
                bubblePadding = layout.options.bubblePadding;

            layout.nodes.forEach(function (
                node: Highcharts.PackedBubblePoint
            ): void {
                node.degree = node.mass;
                node.neighbours = 0;
                layout.nodes.forEach(function (
                    repNode: Highcharts.PackedBubblePoint
                ): void {
                    force = 0;
                    if (
                        // Node can not repulse itself:
                        node !== repNode &&
                        // Only close nodes affect each other:

                        // Not dragged:
                        !node.fixedPosition &&
                        (
                            layout.options.seriesInteraction ||
                            node.series === repNode.series
                        )
                    ) {
                        distanceXY = layout.getDistXY(node, repNode);
                        distanceR = (
                            layout.vectorLength(distanceXY) -
                            (
                                (node.marker as any).radius +
                                (repNode.marker as any).radius +
                                bubblePadding
                            )
                        );
                        // TODO padding configurable
                        if (distanceR < 0) {
                            (node.degree as any) += 0.01;
                            (node.neighbours as any)++;
                            force = layout.repulsiveForce(
                                -distanceR / Math.sqrt(node.neighbours as any),
                                layout.k,
                                node,
                                repNode
                            );
                        }

                        layout.force(
                            'repulsive',
                            node,
                            force * repNode.mass,
                            distanceXY,
                            repNode,
                            distanceR
                        );
                    }
                });
            });
        },
        applyLimitBox: function (
            this: Highcharts.PackedBubbleLayout,
            node: Highcharts.PackedBubblePoint
        ): void {
            var layout = this,
                distanceXY,
                distanceR,
                factor = 0.01;

            // parentNodeLimit should be used together
            // with seriesInteraction: false
            if (
                layout.options.splitSeries &&
                !node.isParentNode &&
                layout.options.parentNodeLimit
            ) {
                distanceXY = layout.getDistXY(
                    node,
                    node.series.parentNode as any
                );
                distanceR = (
                    (node.series.parentNodeRadius as any) -
                    (node.marker as any).radius -
                    layout.vectorLength(distanceXY)
                );
                if (
                    distanceR < 0 &&
                    distanceR > -2 * (node.marker as any).radius
                ) {
                    (node.plotX as any) -= distanceXY.x * factor;
                    (node.plotY as any) -= distanceXY.y * factor;
                }
            }

            Reingold.prototype.applyLimitBox.apply(this, arguments as any);
        },
        isStable: function (this: Highcharts.PackedBubbleLayout): boolean {
            return Math.abs(
                (this.systemTemperature as any) -
                (this.prevSystemTemperature as any)
            ) < 0.00001 ||
            (this.temperature as any) <= 0 ||
            (
                // In first iteration system does not move:
                (this.systemTemperature as any) > 0 &&
                (
                    (this.systemTemperature as any) /
                    this.nodes.length < 0.02 &&
                    (this.enableSimulation as any)
                ) // Use only when simulation is enabled
            );
        }
    }
);

/**
 * @private
 * @class
 * @name Highcharts.seriesTypes.packedbubble
 *
 * @extends Highcharts.Series
 */
seriesType<Highcharts.PackedBubbleSeriesOptions>(
    'packedbubble',
    'bubble',
    /**
     * A packed bubble series is a two dimensional series type, where each point
     * renders a value in X, Y position. Each point is drawn as a bubble
     * where the bubbles don't overlap with each other and the radius
     * of the bubble relates to the value.
     * Requires `highcharts-more.js`.
     *
     * @sample highcharts/demo/packed-bubble/
     *         Packed bubble chart
     * @sample highcharts/demo/packed-bubble-split/
     *         Split packed bubble chart

     * @extends      plotOptions.bubble
     * @excluding    connectEnds, connectNulls, jitter, keys, pointPlacement,
     *               sizeByAbsoluteValue, step, xAxis, yAxis, zMax, zMin
     * @product      highcharts
     * @since        7.0.0
     * @optionparent plotOptions.packedbubble
     */
    {
        /**
         * Minimum bubble size. Bubbles will automatically size between the
         * `minSize` and `maxSize` to reflect the value of each bubble.
         * Can be either pixels (when no unit is given), or a percentage of
         * the smallest one of the plot width and height, divided by the square
         * root of total number of points.
         *
         * @sample highcharts/plotoptions/bubble-size/
         *         Bubble size
         *
         * @type {number|string}
         *
         * @private
         */
        minSize: '10%',
        /**
         * Maximum bubble size. Bubbles will automatically size between the
         * `minSize` and `maxSize` to reflect the value of each bubble.
         * Can be either pixels (when no unit is given), or a percentage of
         * the smallest one of the plot width and height, divided by the square
         * root of total number of points.
         *
         * @sample highcharts/plotoptions/bubble-size/
         *         Bubble size
         *
         * @type {number|string}
         *
         * @private
         */
        maxSize: '50%',
        sizeBy: 'area',
        zoneAxis: 'y',
        tooltip: {
            pointFormat: 'Value: {point.value}'
        },
        /**
         * Flag to determine if nodes are draggable or not. Available for
         * graph with useSimulation set to true only.
         *
         * @since 7.1.0
         *
         * @private
         */
        draggable: true,
        /**
         * An option is giving a possibility to choose between using simulation
         * for calculating bubble positions. These reflects in both animation
         * and final position of bubbles. Simulation is also adding options to
         * the series graph based on used layout. In case of big data sets, with
         * any performance issues, it is possible to disable animation and pack
         * bubble in a simple circular way.
         *
         * @sample highcharts/series-packedbubble/spiral/
         *         useSimulation set to false
         *
         * @since 7.1.0
         *
         * @private
         */
        useSimulation: true,
        /**
         * @type    {Highcharts.SeriesPackedBubbleDataLabelsOptionsObject|Array<Highcharts.SeriesPackedBubbleDataLabelsOptionsObject>}
         * @default {"formatter": function () { return this.point.value; }, "parentNodeFormatter": function () { return this.name; }, "parentNodeTextPath": {"enabled: true}, "padding": 0}
         *
         * @private
         */
        dataLabels: {
            // eslint-disable-next-line valid-jsdoc
            /** @ignore-option */
            formatter: function (
                this: (
                    Highcharts.DataLabelsFormatterContextObject|
                    Highcharts.PackedBubbleDataLabelsFormatterContextObject
                )
            ): (number|null) {
                return (this.point as any).value;
            },
            // eslint-disable-next-line valid-jsdoc
            /** @ignore-option */
            parentNodeFormatter: function (
                this: (
                    Highcharts.DataLabelsFormatterContextObject|
                    Highcharts.PackedBubbleDataLabelsFormatterContextObject
                )
            ): string {
                return (this as any).name;
            },
            /** @ignore-option */
            parentNodeTextPath: {
                enabled: true
            },
            /** @ignore-option */
            padding: 0
        },
        /**
         * Options for layout algorithm when simulation is enabled. Inside there
         * are options to change the speed, padding, initial bubbles positions
         * and more.
         *
         * @extends   plotOptions.networkgraph.layoutAlgorithm
         * @excluding approximation, attractiveForce, repulsiveForce, theta
         * @since     7.1.0
         *
         * @private
         */
        layoutAlgorithm: {
            /**
             * Initial layout algorithm for positioning nodes. Can be one of
             * the built-in options ("circle", "random") or a function where
             * positions should be set on each node (`this.nodes`) as
             * `node.plotX` and `node.plotY`.
             *
             * @sample highcharts/series-networkgraph/initial-positions/
             *         Initial positions with callback
             *
             * @type {"circle"|"random"|Function}
             */
            initialPositions: 'circle',
            /**
             * @sample highcharts/series-packedbubble/initial-radius/
             *         Initial radius set to 200
             *
             * @extends   plotOptions.networkgraph.layoutAlgorithm.initialPositionRadius
             * @excluding states
             */
            initialPositionRadius: 20,
            /**
             * The distance between two bubbles, when the algorithm starts to
             * treat two bubbles as overlapping. The `bubblePadding` is also the
             * expected distance between all the bubbles on simulation end.
             */
            bubblePadding: 5,
            /**
             * Whether bubbles should interact with their parentNode to keep
             * them inside.
             */
            parentNodeLimit: false,
            /**
             * Whether series should interact with each other or not. When
             * `parentNodeLimit` is set to true, thi option should be set to
             * false to avoid sticking points in wrong series parentNode.
             */
            seriesInteraction: true,
            /**
             * In case of split series, this option allows user to drag and
             * drop points between series, for changing point related series.
             *
             * @sample highcharts/series-packedbubble/packed-dashboard/
             *         Example of drag'n drop bubbles for bubble kanban
             */
            dragBetweenSeries: false,
            /**
             * Layout algorithm options for parent nodes.
             *
             * @extends   plotOptions.networkgraph.layoutAlgorithm
             * @excluding approximation, attractiveForce, enableSimulation,
             *            repulsiveForce, theta
             */
            parentNodeOptions: {
                maxIterations: 400,
                gravitationalConstant: 0.03,
                maxSpeed: 50,
                initialPositionRadius: 100,
                seriesInteraction: true,
                /**
                 * Styling options for parentNodes markers. Similar to
                 * line.marker options.
                 *
                 * @sample highcharts/series-packedbubble/parentnode-style/
                 *         Bubble size
                 *
                 * @extends   plotOptions.series.marker
                 * @excluding states
                 */
                marker: {
                    fillColor: null as any,
                    fillOpacity: 1,
                    lineWidth: 1,
                    lineColor: null as any,
                    symbol: 'circle'
                }
            },
            enableSimulation: true,
            /**
             * Type of the algorithm used when positioning bubbles.
             * @ignore-option
             */
            type: 'packedbubble',
            /**
             * Integration type. Integration determines how forces are applied
             * on particles. The `packedbubble` integration is based on
             * the networkgraph `verlet` integration, where the new position
             * is based on a previous position without velocity:
             * `newPosition += previousPosition - newPosition`.
             *
             * @sample highcharts/series-networkgraph/forces/
             *
             * @ignore-option
             */
            integration: 'packedbubble',
            maxIterations: 1000,
            /**
             * Whether to split series into individual groups or to mix all
             * series together.
             *
             * @since   7.1.0
             * @default false
             */
            splitSeries: false,
            /**
             * Max speed that node can get in one iteration. In terms of
             * simulation, it's a maximum translation (in pixels) that a node
             * can move (in both, x and y, dimensions). While `friction` is
             * applied on all nodes, max speed is applied only for nodes that
             * move very fast, for example small or disconnected ones.
             *
             * @see [layoutAlgorithm.integration](#series.networkgraph.layoutAlgorithm.integration)
             *
             * @see [layoutAlgorithm.friction](#series.networkgraph.layoutAlgorithm.friction)
             */
            maxSpeed: 5,
            gravitationalConstant: 0.01,
            friction: -0.981
        }
    }, {
        /**
         * An internal option used for allowing nodes dragging.
         * @private
         */
        hasDraggableNodes: true,
        /**
         * Array of internal forces. Each force should be later defined in
         * integrations.js.
         * @private
         */
        forces: ['barycenter', 'repulsive'],
        pointArrayMap: ['value'],
        pointValKey: 'value',
        isCartesian: false,
        axisTypes: [],
        noSharedTooltip: true,

        /* eslint-disable no-invalid-this, valid-jsdoc */

        /**
         * Create a single array of all points from all series
         * @private
         * @param {Highcharts.Series} series Array of all series objects
         * @return {Array<Highcharts.PackedBubbleData>} Returns the array of all points.
         */
        accumulateAllPoints: function (
            this: Highcharts.PackedBubbleSeries,
            series: Highcharts.PackedBubbleSeries
        ): Array<Highcharts.PackedBubbleData> {

            var chart = series.chart,
                allDataPoints = [] as Array<Highcharts.PackedBubbleData>,
                i: number, j: number;

            for (i = 0; i < chart.series.length; i++) {

                series = chart.series[i] as any;

                if (
                    series.visible ||
                    !(chart.options.chart as any).ignoreHiddenSeries
                ) {

                    // add data to array only if series is visible
                    for (j = 0; j < (series.yData as any).length; j++) {
                        allDataPoints.push([
                            null, null,
                            (series.yData as any)[j],
                            series.index,
                            j,
                            {
                                id: j as any,
                                marker: {
                                    radius: 0
                                }
                            }
                        ]);
                    }
                }
            }

            return allDataPoints;
        },
        init: function (
            this: Highcharts.PackedBubbleSeries
        ): Highcharts.PackedBubbleSeries {

            Series.prototype.init.apply(this, arguments as any);

            // When one series is modified, the others need to be recomputed
            addEvent(this, 'updatedData', function (
                this: Highcharts.PackedBubbleSeries
            ): void {
                this.chart.series.forEach(function (
                    s: Highcharts.Series
                ): void {
                    if (s.type === this.type) {
                        s.isDirty = true;
                    }
                }, this);
            });

            return this;
        },
        render: function (this: Highcharts.PackedBubbleSeries): void {
            var series = this,
                dataLabels = [] as Array<Highcharts.SVGElement>;
            Series.prototype.render.apply(this, arguments as any);
            // #10823 - dataLabels should stay visible
            // when enabled allowOverlap.
            if (!(series.options.dataLabels as any).allowOverlap) {
                series.data.forEach(function (
                    point: Highcharts.PackedBubblePoint
                ): void {
                    if (isArray(point.dataLabels)) {
                        point.dataLabels.forEach(function (
                            dataLabel: Highcharts.SVGElement
                        ): void {
                            dataLabels.push(dataLabel);
                        });
                    }
                });
                series.chart.hideOverlappingLabels(dataLabels);
            }
        },
        // Needed because of z-indexing issue if point is added in series.group
        setVisible: function (this: Highcharts.PackedBubbleSeries): void {
            var series = this;
            Series.prototype.setVisible.apply(series, arguments as any);
            if (series.parentNodeLayout && series.graph) {
                if (series.visible) {
                    series.graph.show();
                    if ((series.parentNode as any).dataLabel) {
                        (series.parentNode as any).dataLabel.show();
                    }
                } else {
                    series.graph.hide();
                    series.parentNodeLayout
                        .removeElementFromCollection(
                            series.parentNode, series.parentNodeLayout.nodes
                        );
                    if ((series.parentNode as any).dataLabel) {
                        (series.parentNode as any).dataLabel.hide();
                    }
                }
            } else if (series.layout) {
                if (series.visible) {
                    series.layout.addElementsToCollection(
                        series.points, series.layout.nodes
                    );
                } else {
                    series.points.forEach(function (
                        node: Highcharts.PackedBubblePoint
                    ): void {
                        series.layout.removeElementFromCollection(
                            node, series.layout.nodes
                        );
                    });
                }
            }
        },
        // Packedbubble has two separate collecions of nodes if split, render
        // dataLabels for both sets:
        drawDataLabels: function (this: Highcharts.PackedBubbleSeries): void {
            var textPath = (this.options.dataLabels as any).textPath,
                points = this.points;

            // Render node labels:
            Series.prototype.drawDataLabels.apply(this, arguments as any);

            // Render parentNode labels:
            if (this.parentNode) {
                this.parentNode.formatPrefix = 'parentNode';
                this.points = [this.parentNode];
                (this.options.dataLabels as any).textPath =
                    (this.options.dataLabels as any).parentNodeTextPath;
                Series.prototype.drawDataLabels.apply(this, arguments as any);

                // Restore nodes
                this.points = points;
                (this.options.dataLabels as any).textPath = textPath;
            }
        },
        /**
         * The function responsible for calculating series bubble' s bBox.
         * Needed because of exporting failure when useSimulation
         * is set to false
         * @private
         */
        seriesBox: function (
            this: Highcharts.PackedBubbleSeries
        ): (Array<number>|null) {
            var series = this,
                chart = series.chart,
                data = series.data,
                max = Math.max,
                min = Math.min,
                radius,
                // bBox = [xMin, xMax, yMin, yMax]
                bBox = [
                    chart.plotLeft,
                    chart.plotLeft + chart.plotWidth,
                    chart.plotTop,
                    chart.plotTop + chart.plotHeight
                ];

            data.forEach(function (p: Highcharts.PackedBubblePoint): void {
                if (
                    defined(p.plotX) &&
                    defined(p.plotY) &&
                    (p.marker as any).radius
                ) {
                    radius = (p.marker as any).radius;
                    bBox[0] = min(bBox[0], p.plotX - radius);
                    bBox[1] = max(bBox[1], p.plotX + radius);
                    bBox[2] = min(bBox[2], p.plotY - radius);
                    bBox[3] = max(bBox[3], p.plotY + radius);
                }
            });
            return isNumber((bBox as any).width / (bBox as any).height) ?
                bBox :
                null;
        },
        /**
         * The function responsible for calculating the parent node radius
         * based on the total surface of iniside-bubbles and the group BBox
         * @private
         */
        calculateParentRadius: function (
            this: Highcharts.PackedBubbleSeries
        ): void {
            var series = this,
                bBox: (Array<number>|null),
                parentPadding = 20,
                minParentRadius = 20;

            bBox = series.seriesBox();
            series.parentNodeRadius =
                Math.min(
                    Math.max(
                        Math.sqrt(
                            2 * (series.parentNodeMass as any) / Math.PI
                        ) + parentPadding,
                        minParentRadius
                    ),
                    bBox ?
                        Math.max(
                            Math.sqrt(
                                Math.pow((bBox as any).width, 2) +
                                Math.pow((bBox as any).height, 2)
                            ) / 2 + parentPadding,
                            minParentRadius
                        ) :
                        Math.sqrt(
                            2 * (series.parentNodeMass as any) / Math.PI
                        ) + parentPadding
                );

            if (series.parentNode) {
                (series.parentNode as any).marker.radius =
                    series.parentNode.radius = series.parentNodeRadius;
            }
        },
        // Create Background/Parent Nodes for split series.
        drawGraph: function (this: Highcharts.PackedBubbleSeries): void {

            // if the series is not using layout, don't add parent nodes
            if (!this.layout || !this.layout.options.splitSeries) {
                return;
            }

            var series = this,
                chart = series.chart,
                parentAttribs = {} as Highcharts.SVGAttributes,
                nodeMarker: Highcharts.BubblePointMarkerOptions =
                    (this.layout.options.parentNodeOptions as any).marker,
                parentOptions: Highcharts.SVGAttributes = {
                    fill: nodeMarker.fillColor ||
                        (color as any)(series.color).brighten(0.4).get(),
                    opacity: nodeMarker.fillOpacity,
                    stroke: nodeMarker.lineColor || series.color,
                    'stroke-width': nodeMarker.lineWidth
                },
                visibility = series.visible ? 'inherit' : 'hidden';

            // create the group for parent Nodes if doesn't exist
            if (!this.parentNodesGroup) {
                series.parentNodesGroup = series.plotGroup(
                    'parentNodesGroup',
                    'parentNode',
                    visibility,
                    0.1, chart.seriesGroup
                );
                (series.group as any).attr({
                    zIndex: 2
                });
            }

            this.calculateParentRadius();
            parentAttribs = H.merge({
                x: (series.parentNode as any).plotX -
                    (series.parentNodeRadius as any),
                y: (series.parentNode as any).plotY -
                    (series.parentNodeRadius as any),
                width: (series.parentNodeRadius as any) * 2,
                height: (series.parentNodeRadius as any) * 2
            }, parentOptions);
            if (!series.graph) {
                series.graph = (series.parentNode as any).graphic =
                    chart.renderer.symbol(parentOptions.symbol)
                        .attr(parentAttribs)
                        .add(series.parentNodesGroup);
            } else {
                series.graph.attr(parentAttribs);
            }
        },
        /**
         * Creating parent nodes for split series, in which all the bubbles
         * are rendered.
         * @private
         */
        createParentNodes: function (
            this: Highcharts.PackedBubbleSeries
        ): void {
            var series = this,
                chart = series.chart,
                parentNodeLayout = series.parentNodeLayout,
                nodeAdded,
                parentNode = series.parentNode;

            series.parentNodeMass = 0;

            series.points.forEach(function (
                p: Highcharts.PackedBubblePoint
            ): void {
                (series.parentNodeMass as any) +=
                    Math.PI * Math.pow((p.marker as any).radius, 2);
            });

            series.calculateParentRadius();
            parentNodeLayout.nodes.forEach(function (
                node: Highcharts.PackedBubblePoint
            ): void {
                if (node.seriesIndex === series.index) {
                    nodeAdded = true;
                }
            });
            parentNodeLayout.setArea(0, 0, chart.plotWidth, chart.plotHeight);
            if (!nodeAdded) {
                if (!parentNode) {
                    parentNode = (
                        new NetworkPoint()
                    ).init(
                        this,
                        {
                            mass: (series.parentNodeRadius as any) / 2,
                            marker: {
                                radius: series.parentNodeRadius
                            },
                            dataLabels: {
                                inside: false
                            },
                            dataLabelOnNull: true,
                            degree: series.parentNodeRadius,
                            isParentNode: true,
                            seriesIndex: series.index
                        } as any
                    ) as any;
                }
                if (series.parentNode) {
                    (parentNode as any).plotX = series.parentNode.plotX;
                    (parentNode as any).plotY = series.parentNode.plotY;
                }
                series.parentNode = parentNode;
                parentNodeLayout.addElementsToCollection(
                    [series], parentNodeLayout.series
                );
                parentNodeLayout.addElementsToCollection(
                    [parentNode as any], parentNodeLayout.nodes
                );
            }
        },
        /**
         * Function responsible for adding series layout, used for parent nodes.
         * @private
         */
        addSeriesLayout: function (this: Highcharts.PackedBubbleSeries): void {
            var series = this,
                layoutOptions = series.options.layoutAlgorithm,
                graphLayoutsStorage = series.chart.graphLayoutsStorage,
                graphLayoutsLookup = series.chart.graphLayoutsLookup,
                parentNodeOptions = H.merge(
                    layoutOptions,
                    (layoutOptions as any).parentNodeOptions,
                    {
                        enableSimulation: series.layout.options.enableSimulation
                    }
                ),
                parentNodeLayout;

            parentNodeLayout = graphLayoutsStorage[
                (layoutOptions as any).type + '-series'
            ];

            if (!parentNodeLayout) {

                graphLayoutsStorage[(layoutOptions as any).type + '-series'] =
                parentNodeLayout =
                    new (H.layouts[(layoutOptions as any).type] as any)();

                parentNodeLayout.init(parentNodeOptions);

                graphLayoutsLookup.splice(
                    parentNodeLayout.index, 0, parentNodeLayout
                );
            }
            series.parentNodeLayout = parentNodeLayout;
            this.createParentNodes();
        },
        /**
         * Adding the basic layout to series points.
         * @private
         */
        addLayout: function (this: Highcharts.PackedBubbleSeries): void {
            var series = this,
                layoutOptions = series.options.layoutAlgorithm,
                graphLayoutsStorage = series.chart.graphLayoutsStorage,
                graphLayoutsLookup = series.chart.graphLayoutsLookup,
                chartOptions = series.chart.options.chart,
                layout;

            if (!graphLayoutsStorage) {
                series.chart.graphLayoutsStorage = graphLayoutsStorage = {};
                series.chart.graphLayoutsLookup = graphLayoutsLookup = [];
            }

            layout = graphLayoutsStorage[(layoutOptions as any).type];

            if (!layout) {
                (layoutOptions as any).enableSimulation =
                    !defined((chartOptions as any).forExport) ?
                        (layoutOptions as any).enableSimulation :
                        !(chartOptions as any).forExport;

                graphLayoutsStorage[(layoutOptions as any).type] = layout =
                    new (H.layouts[(layoutOptions as any).type] as any)();

                layout.init(layoutOptions);
                graphLayoutsLookup.splice(layout.index, 0, layout);

            }

            series.layout = layout;

            series.points.forEach(function (
                node: Highcharts.PackedBubblePoint
            ): void {
                node.mass = 2;
                node.degree = 1;
                node.collisionNmb = 1;
            });

            layout.setArea(
                0, 0, series.chart.plotWidth, series.chart.plotHeight
            );
            layout.addElementsToCollection([series], layout.series);
            layout.addElementsToCollection(series.points, layout.nodes);
        },
        /**
         * Function responsible for adding all the layouts to the chart.
         * @private
         */
        deferLayout: function (this: Highcharts.PackedBubbleSeries): void {
            // TODO split layouts to independent methods
            var series = this,
                layoutOptions = series.options.layoutAlgorithm;
            if (!series.visible) {
                return;
            }
            // layout is using nodes for position calculation
            series.addLayout();

            if ((layoutOptions as any).splitSeries) {
                series.addSeriesLayout();
            }
        },
        /**
         * Extend the base translate method to handle bubble size,
         * and correct positioning them.
         * @private
         */
        translate: function (this: Highcharts.PackedBubbleSeries): void {

            var series = this,
                chart = series.chart,
                data = series.data,
                index = series.index,
                point,
                radius,
                positions,
                i,
                useSimulation = series.options.useSimulation;

            series.processedXData = series.xData;
            series.generatePoints();

            // merged data is an array with all of the data from all series
            if (!defined(chart.allDataPoints)) {
                chart.allDataPoints = series.accumulateAllPoints(series);
                // calculate radius for all added data
                series.getPointRadius();
            }

            // after getting initial radius, calculate bubble positions

            if (useSimulation) {
                positions = chart.allDataPoints;
            } else {
                positions = series.placeBubbles(chart.allDataPoints);
                series.options.draggable = false;
            }

            // Set the shape and arguments to be picked up in drawPoints
            for (i = 0; i < positions.length; i++) {

                if (positions[i][3] === index) {

                    // update the series points with the val from positions
                    // array
                    point = data[positions[i][4] as any];
                    radius = positions[i][2];

                    if (!useSimulation) {
                        point.plotX = (
                            (positions[i][0] as any) - chart.plotLeft +
                            chart.diffX
                        );
                        point.plotY = (
                            (positions[i][1] as any) - chart.plotTop +
                            chart.diffY
                        );
                    }
                    point.marker = H.extend(point.marker, {
                        radius: radius,
                        width: 2 * (radius as any),
                        height: 2 * (radius as any)
                    });
                    point.radius = radius as any;
                }
            }

            if (useSimulation) {
                series.deferLayout();
            }
        },
        /**
         * Check if two bubbles overlaps.
         * @private
         * @param {Array} first bubble
         * @param {Array} second bubble
         * @return {Boolean} overlap or not
         */
        checkOverlap: function (
            this: Highcharts.PackedBubbleSeries,
            bubble1: Array<number>,
            bubble2: Array<number>
        ): boolean {
            var diffX = bubble1[0] - bubble2[0], // diff of X center values
                diffY = bubble1[1] - bubble2[1], // diff of Y center values
                sumRad = bubble1[2] + bubble2[2]; // sum of bubble radius

            return (
                Math.sqrt(diffX * diffX + diffY * diffY) -
                Math.abs(sumRad)
            ) < -0.001;
        },
        /**
         * Function that is adding one bubble based on positions and sizes of
         * two other bubbles, lastBubble is the last added bubble, newOrigin is
         * the bubble for positioning new bubbles. nextBubble is the curently
         * added bubble for which we are calculating positions
         * @private
         * @param {Array<number>} lastBubble The closest last bubble
         * @param {Array<number>} newOrigin New bubble
         * @param {Array<number>} nextBubble The closest next bubble
         * @return {Array<number>} Bubble with correct positions
         */
        positionBubble: function (
            this: Highcharts.PackedBubbleSeries,
            lastBubble: Array<number>,
            newOrigin: Array<number>,
            nextBubble: Array<number>
        ): Array<number> {
            var sqrt = Math.sqrt,
                asin = Math.asin,
                acos = Math.acos,
                pow = Math.pow,
                abs = Math.abs,
                distance = sqrt( // dist between lastBubble and newOrigin
                    pow((lastBubble[0] - newOrigin[0]), 2) +
                    pow((lastBubble[1] - newOrigin[1]), 2)
                ),
                alfa = acos(
                    // from cosinus theorem: alfa is an angle used for
                    // calculating correct position
                    (
                        pow(distance, 2) +
                        pow(nextBubble[2] + newOrigin[2], 2) -
                        pow(nextBubble[2] + lastBubble[2], 2)
                    ) / (2 * (nextBubble[2] + newOrigin[2]) * distance)
                ),

                beta = asin( // from sinus theorem.
                    abs(lastBubble[0] - newOrigin[0]) /
                    distance
                ),
                // providing helping variables, related to angle between
                // lastBubble and newOrigin
                gamma = (lastBubble[1] - newOrigin[1]) < 0 ? 0 : Math.PI,
                // if new origin y is smaller than last bubble y value
                // (2 and 3 quarter),
                // add Math.PI to final angle

                delta = (lastBubble[0] - newOrigin[0]) *
                (lastBubble[1] - newOrigin[1]) < 0 ?
                    1 : -1, // (1st and 3rd quarter)
                finalAngle = gamma + alfa + beta * delta,
                cosA = Math.cos(finalAngle),
                sinA = Math.sin(finalAngle),
                posX = newOrigin[0] + (newOrigin[2] + nextBubble[2]) * sinA,
                // center of new origin + (radius1 + radius2) * sinus A
                posY = newOrigin[1] - (newOrigin[2] + nextBubble[2]) * cosA;
            return [
                posX,
                posY,
                nextBubble[2],
                nextBubble[3],
                nextBubble[4]
            ]; // the same as described before
        },
        /**
         * This is the main function responsible
         * for positioning all of the bubbles
         * allDataPoints - bubble array, in format [pixel x value,
         * pixel y value, radius,
         * related series index, related point index]
         * @private
         * @param {Array<Highcharts.PackedBubbleData>} allDataPoints All points from all series
         * @return {Array<Highcharts.PackedBubbleData>} Positions of all bubbles
         */
        placeBubbles: function (
            this: Highcharts.PackedBubbleSeries,
            allDataPoints: Array<Highcharts.PackedBubbleData>
        ): Array<Array<number>> {

            var series = this,
                checkOverlap = series.checkOverlap,
                positionBubble = series.positionBubble,
                bubblePos = [] as Array<Array<Array<number>>>,
                stage = 1,
                j = 0,
                k = 0,
                calculatedBubble,
                sortedArr: Array<Highcharts.PackedBubbleData>,
                arr = [] as Array<Array<number>>,
                i;

            // sort all points
            sortedArr = allDataPoints.sort(function (
                a: Highcharts.PackedBubbleData,
                b: Highcharts.PackedBubbleData
            ): number {
                return (b[2] as any) - (a[2] as any);
            });

            if (sortedArr.length) {
                // create first bubble in the middle of the chart
                bubblePos.push([
                    [
                        0, // starting in 0,0 coordinates
                        0,
                        sortedArr[0][2] as any, // radius
                        sortedArr[0][3], // series index
                        sortedArr[0][4]
                    ] // point index
                ]); // 0 level bubble
                if (sortedArr.length > 1) {

                    bubblePos.push([
                        [
                            0,
                            (
                                0 - (sortedArr[1][2] as any) -
                                (sortedArr[0][2] as any)
                            ),
                            // move bubble above first one
                            sortedArr[1][2] as any,
                            sortedArr[1][3],
                            sortedArr[1][4]
                        ]
                    ]); // 1 level 1st bubble

                    // first two already positioned so starting from 2
                    for (i = 2; i < sortedArr.length; i++) {
                        sortedArr[i][2] = sortedArr[i][2] || 1;
                        // in case if radius is calculated as 0.
                        calculatedBubble = positionBubble(
                            bubblePos[stage][j] as any,
                            bubblePos[stage - 1][k] as any,
                            sortedArr[i] as any
                        ); // calculate initial bubble position

                        if (
                            checkOverlap(
                                calculatedBubble,
                                bubblePos[stage][0] as any
                            )
                        ) {
                            /* if new bubble is overlapping with first bubble
                             * in current level (stage)
                             */

                            bubblePos.push([]);
                            k = 0;
                            /* reset index of bubble, used for
                             * positioning the bubbles around it,
                             * we are starting from first bubble in next
                             * stage because we are changing level to higher
                             */
                            bubblePos[stage + 1].push(
                                positionBubble(
                                    bubblePos[stage][j] as any,
                                    bubblePos[stage][0] as any,
                                    sortedArr[i] as any
                                )
                            );
                            // (last bubble, 1. from curr stage, new bubble)
                            stage++; // the new level is created, above current
                            j = 0; // set the index of bubble in curr level to 0
                        } else if (
                            stage > 1 &&
                            bubblePos[stage - 1][k + 1] &&
                            checkOverlap(
                                calculatedBubble,
                                bubblePos[stage - 1][k + 1] as any
                            )
                        ) {
                            /* if new bubble is overlapping with one of the prev
                             * stage bubbles, it means that - bubble, used for
                             * positioning the bubbles around it has changed
                             * so we need to recalculate it
                             */
                            k++;
                            bubblePos[stage].push(
                                positionBubble(
                                    bubblePos[stage][j] as any,
                                    bubblePos[stage - 1][k] as any,
                                    sortedArr[i] as any
                                )
                            );
                            // (last bubble, prev stage bubble, new bubble)
                            j++;
                        } else { // simply add calculated bubble
                            j++;
                            bubblePos[stage].push(calculatedBubble);
                        }
                    }
                }
                series.chart.stages = bubblePos;
                // it may not be necessary but adding it just in case -
                // it is containing all of the bubble levels

                series.chart.rawPositions =
                    ([] as Array<Array<number>>)
                        .concat.apply([], bubblePos);
                // bubble positions merged into one array

                series.resizeRadius();
                arr = series.chart.rawPositions;
            }
            return arr;
        },
        /**
         * The function responsible for resizing the bubble radius.
         * In shortcut: it is taking the initially
         * calculated positions of bubbles. Then it is calculating the min max
         * of both dimensions, creating something in shape of bBox.
         * The comparison of bBox and the size of plotArea
         * (later it may be also the size set by customer) is giving the
         * value how to recalculate the radius so it will match the size
         * @private
         */
        resizeRadius: function (this: Highcharts.PackedBubbleSeries): void {

            var chart = this.chart,
                positions = chart.rawPositions,
                min = Math.min,
                max = Math.max,
                plotLeft = chart.plotLeft,
                plotTop = chart.plotTop,
                chartHeight = chart.plotHeight,
                chartWidth = chart.plotWidth,
                minX, maxX, minY, maxY,
                radius,
                bBox,
                spaceRatio,
                smallerDimension,
                i;

            minX = minY = Number.POSITIVE_INFINITY; // set initial values
            maxX = maxY = Number.NEGATIVE_INFINITY;

            for (i = 0; i < positions.length; i++) {
                radius = positions[i][2];
                minX = min(minX, (positions[i][0] as any) - (radius as any));
                // (x center-radius) is the min x value used by specific bubble
                maxX = max(maxX, (positions[i][0] as any) + radius);
                minY = min(minY, (positions[i][1] as any) - (radius as any));
                maxY = max(maxY, (positions[i][1] as any) + radius);
            }

            bBox = [maxX - minX, maxY - minY];
            spaceRatio = [
                (chartWidth - plotLeft) / bBox[0],
                (chartHeight - plotTop) / bBox[1]
            ];

            smallerDimension = min.apply([], spaceRatio);

            if (Math.abs(smallerDimension - 1) > 1e-10) {
                // if bBox is considered not the same width as possible size
                for (i = 0; i < positions.length; i++) {
                    (positions[i][2] as any) *= smallerDimension;
                }
                this.placeBubbles(positions as any);
            } else {
                /** if no radius recalculation is needed, we need to position
                 * the whole bubbles in center of chart plotarea
                 * for this, we are adding two parameters,
                 * diffY and diffX, that are related to differences
                 * between the initial center and the bounding box
                 */
                chart.diffY = chartHeight / 2 +
                    plotTop - minY - (maxY - minY) / 2;
                chart.diffX = chartWidth / 2 +
                    plotLeft - minX - (maxX - minX) / 2;
            }
        },
        /**
         * Calculate min and max bubble value for radius calculation.
         * @private
         */
        calculateZExtremes: function (
            this: Highcharts.PackedBubbleSeries
        ): Array<number> {
            var chart = this.chart,
                zMin = this.options.zMin,
                zMax = this.options.zMax,
                valMin = Infinity,
                valMax = -Infinity;

            if (zMin && zMax) {
                return [zMin, zMax];
            }
            // it is needed to deal with null
            // and undefined values
            chart.series.forEach(function (s: Highcharts.Series): void {
                ((s as Highcharts.PackedBubbleSeries).yData as any).forEach(
                    function (p: number): void {
                        if (defined(p)) {
                            if (p > valMax) {
                                valMax = p;
                            }
                            if (p < valMin) {
                                valMin = p;
                            }
                        }
                    }
                );
            });

            zMin = pick(zMin, valMin);
            zMax = pick(zMax, valMax);

            return [zMin, zMax];
        },
        /**
         * Calculate radius of bubbles in series.
         * @private
         */
        getPointRadius: function (this: Highcharts.PackedBubbleSeries): void {
            var series = this,
                chart = series.chart,
                plotWidth = chart.plotWidth,
                plotHeight = chart.plotHeight,
                seriesOptions = series.options,
                useSimulation = seriesOptions.useSimulation,
                smallestSize = Math.min(plotWidth, plotHeight),
                extremes = {} as Highcharts.Dictionary<number>,
                radii = [] as Array<(number|null)>,
                allDataPoints = chart.allDataPoints,
                minSize: number,
                maxSize: number,
                value: (number|null),
                radius: (number|null),
                zExtremes: Array<number>;
            ['minSize', 'maxSize'].forEach(function (prop: string): void {
                var length = parseInt((seriesOptions as any)[prop], 10),
                    isPercent = /%$/.test((seriesOptions as any)[prop]);

                extremes[prop] = isPercent ?
                    smallestSize * length / 100 :
                    length * Math.sqrt(allDataPoints.length);
            });

            chart.minRadius = minSize = extremes.minSize /
                Math.sqrt(allDataPoints.length);
            chart.maxRadius = maxSize = extremes.maxSize /
                Math.sqrt(allDataPoints.length);

            zExtremes = useSimulation ?
                series.calculateZExtremes() :
                [minSize, maxSize];

            (allDataPoints || []).forEach(function (
                point: Highcharts.PackedBubbleData,
                i: number
            ): void {

                value = useSimulation ?
                    Math.max(
                        Math.min((point[2] as any), zExtremes[1]),
                        zExtremes[0]
                    ) :
                    (point[2] as any);

                radius = series.getRadius(
                    zExtremes[0],
                    zExtremes[1],
                    minSize,
                    maxSize,
                    value
                );
                if (radius === 0) {
                    radius = null;
                }
                allDataPoints[i][2] = radius;
                radii.push(radius);
            });

            series.radii = radii;
        },
        // Draggable mode:
        /**
         * Redraw halo on mousemove during the drag&drop action.
         * @private
         * @param {Highcharts.Point} point The point that should show halo.
         */
        redrawHalo: dragNodesMixin.redrawHalo,
        /**
         * Mouse down action, initializing drag&drop mode.
         * @private
         * @param {global.Event} event Browser event, before normalization.
         * @param {Highcharts.Point} point The point that event occured.
         */
        onMouseDown: dragNodesMixin.onMouseDown,
        /**
         * Mouse move action during drag&drop.
         * @private
         * @param {global.Event} event Browser event, before normalization.
         * @param {Highcharts.Point} point The point that event occured.
         */
        onMouseMove: dragNodesMixin.onMouseMove,
        /**
         * Mouse up action, finalizing drag&drop.
         * @private
         * @param {Highcharts.Point} point The point that event occured.
         */
        onMouseUp: function (
            this: Highcharts.PackedBubbleSeries,
            point: Highcharts.PackedBubblePoint
        ): void {
            if (point.fixedPosition && !point.removed) {
                var distanceXY,
                    distanceR,
                    layout = this.layout,
                    parentNodeLayout = this.parentNodeLayout;

                if (parentNodeLayout && layout.options.dragBetweenSeries) {
                    parentNodeLayout.nodes.forEach(function (
                        node: Highcharts.PackedBubblePoint
                    ): void {
                        if (
                            point && point.marker &&
                            node !== point.series.parentNode
                        ) {
                            distanceXY = layout.getDistXY(point, node);
                            distanceR = (
                                layout.vectorLength(distanceXY) -
                                (node.marker as any).radius -
                                (point.marker as any).radius
                            );
                            if (distanceR < 0) {
                                node.series.addPoint(H.merge(point.options, {
                                    plotX: point.plotX,
                                    plotY: point.plotY
                                }), false);
                                layout.removeElementFromCollection(
                                    point, layout.nodes
                                );
                                point.remove();
                            }
                        }
                    });
                }
                dragNodesMixin.onMouseUp.apply(this, arguments as any);
            }
        },
        destroy: function (this: Highcharts.PackedBubbleSeries): void {
            // Remove the series from all layouts series collections #11469
            if (this.chart.graphLayoutsLookup) {
                this.chart.graphLayoutsLookup.forEach(function (layout): void {
                    layout.removeElementFromCollection(this, layout.series);
                }, this);
            }

            if (this.parentNode) {
                this.parentNodeLayout.removeElementFromCollection(
                    this.parentNode, this.parentNodeLayout.nodes
                );
                if (this.parentNode.dataLabel) {
                    this.parentNode.dataLabel =
                        this.parentNode.dataLabel.destroy();
                }
            }
            H.Series.prototype.destroy.apply(this, arguments as any);
        },
        alignDataLabel: H.Series.prototype.alignDataLabel
    }, {
        /**
         * Destroy point.
         * Then remove point from the layout.
         * @private
         * @return {undefined}
         */
        destroy: function (this: Highcharts.PackedBubblePoint): void {
            if (this.series.layout) {
                this.series.layout.removeElementFromCollection(
                    this, this.series.layout.nodes
                );
            }
            return Point.prototype.destroy.apply(this, arguments as any);
        }
    }
);

// Remove accumulated data points to redistribute all of them again
// (i.e after hiding series by legend)

addEvent(Chart as any, 'beforeRedraw', function (
    this: Highcharts.PackedBubbleChart
): void {
    if (this.allDataPoints) {
        delete this.allDataPoints;
    }
});

/* eslint-enable no-invalid-this, valid-jsdoc */

/**
 * A `packedbubble` series. If the [type](#series.packedbubble.type) option is
 * not specified, it is inherited from [chart.type](#chart.type).
 *
 * @type      {Object}
 * @extends   series,plotOptions.packedbubble
 * @excluding dataParser,dataURL,stack
 * @product   highcharts highstock
 * @apioption series.packedbubble
 */

/**
 * An array of data points for the series. For the `packedbubble` series type,
 * points can be given in the following ways:
 *
 * 1.  An array of `values`.
 *
 *  ```js
 *     data: [5, 1, 20]
 *  ```
 *
 * 2.  An array of objects with named values. The objects are point
 * configuration objects as seen below. If the total number of data points
 * exceeds the series' [turboThreshold](#series.packedbubble.turboThreshold),
 * this option is not available.
 *
 *  ```js
 *     data: [{
 *         value: 1,
 *         name: "Point2",
 *         color: "#00FF00"
 *     }, {
 *         value: 5,
 *         name: "Point1",
 *         color: "#FF00FF"
 *     }]
 *  ```
 *
 * @type      {Array<Object|Array>}
 * @extends   series.line.data
 * @excluding marker, x, y
 * @sample    {highcharts} highcharts/series/data-array-of-objects/
 *            Config objects
 * @product   highcharts
 * @apioption series.packedbubble.data
 */

/**
 * @type      {Highcharts.SeriesPackedBubbleDataLabelsOptionsObject|Array<Highcharts.SeriesPackedBubbleDataLabelsOptionsObject>}
 * @product   highcharts
 * @apioption series.packedbubble.data.dataLabels
 */

/**
 * @excluding enabled,enabledThreshold,height,radius,width
 * @product   highcharts
 * @apioption series.packedbubble.marker
 */

''; // adds doclets above to transpiled file
