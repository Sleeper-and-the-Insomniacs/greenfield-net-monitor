# greenfield-net-monitor

Network Heartbeat Monitor: Monitor and diagnose your network server, set up real-time alerts based on tracked activity, diagnose problems, and more.

#### IT/NOC relevant: Network Heartbeat Monitor- a user would be able to monitor all added PCs and see if they're down/up, be sent message alerts when the status of something changes. computers added to the network would have periodic check ins.

### Notifications/Alerts

- Realtime notifications
- app is up, something happens, alert toast? – websockets
- socket.io on Caity’s recommendation
- Notifications log on website
- Text or email notifications delivered on events?
- Look into Apis
- Toggle alerts per device

### Dashboard

- display data/groups
- History/Log
- Result Analysis
- ChartJS

### Monitoring

- Generic Pinging
- Scheduling\
- HTTP requests
- Test Endpoints

### Synthetic Transactions - Feature Scope

A scripted, multi-step simulation of a user journey (e.g., login -> search -> checkout), run on a schedule, checking that the full path works - not just that one URL responds. Tracks sequential steps and failing fast on any step that breaks.

#### Step 1: Data Models

- [x] `SyntheticTest.js` - steps array (method, url, body, expectedStatus), interval, active flag
- [ ] `TestResult.js` - per-step results, overall status, TTL index (30-day auto-delete)
- [ ] Confirm with buddies: per-step `expectedStatus` validation, or just final-step?
- Docs: [Mongoose indexes](https://mongoosejs.com/docs/guide.html#indexes)
- Docs: [MongoDB TTL indexes](https://mongodb.com/docs/manual/core/index-ttl/)

#### Step 2: CRUD API (`routes/synthetic.js`)

- [ ] `POST /`, `GET /`, `PUT /:id`, `DELETE /:id` - matching Router exporting
- [ ] Verify with Postman: create -> confirm in MongoDB -> confirm job appears in scheduler
- Docs: [Express Router](https://expressjs.com/en/guide/routing.html)

#### Step 3: Execution Engine (`services/syntheticRunner.js`)

- [ ] Run steps sequentially, stop chain on first failure
- [ ] Record per-step status, response time, error
- [ ] Test standalone with a hardcoded test doc before wiring into cron
- Docs: [axios](https://axios-http.com/docs/intro)

#### Step 4: Dynamic Scheduler (`services/scheduler.js`)

- [ ] In-memory `Map` (testId -> cron task) for runtime add/remove/edit
- [ ] `startSyntheticScheduler` - boot-time reconciliation from DB
- [ ] Decide with buddies: `active: false` toggle vs. hard delete - branch logic accordingly
- Docs: [node-cron](https://www.npmjs.com/package/node-cron)

#### Step 5: Socket.io Integration

- [ ] Emit `synthetic:result` to room `synthetic:${testId}`
- [ ] Join sockets to synthetic rooms on connection (`index.js`)
- [ ] Client-side: listen for `synthetic:result` on dashboard load
- Docs: [Socket.io rooms](https://socket.io/docs/v4/rooms/)

#### Step 6: Handoff to Dashboard

- [ ] `GET /tests/:id/stats` - confirm shape with Claire (raw array vs. pre-aggregated) before building
- [ ] Document `TestResult` shape for her

#### Research

- [ ] cron - monitor.interval
